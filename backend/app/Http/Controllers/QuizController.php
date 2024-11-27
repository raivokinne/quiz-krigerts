<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        $quizzes = Quiz::with('questions.options')->get();
        $quizzes['user'] = $request->user();

        return response()->json($quizzes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_title' => 'required|string|max:255',
            'category' => 'required|string',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.options' => 'required|array|min:4',
            'questions.*.correctAnswer' => 'required|integer|min:0|max:3',
            'user_id' => 'required|integer'
        ]);

        $quiz = Quiz::create([
            'title' => $validated['quiz_title'],
            'category' => $validated['category'],
            'user_id' => $validated['user_id']
        ]);

        foreach ($validated['questions'] as $questionData) {
            $question = Question::create([
                'quiz_id' => $quiz->id,
                'question' => $questionData['question'],
                'correct_answer' => $questionData['correctAnswer'],
            ]);

            foreach ($questionData['options'] as $option) {
                $question->options()->create(['text' => $option]);
            }
        }

        return response()->json(['message' => 'Quiz created successfully!'], 201);
    }

    public function update(Request $request, $quizId)
    {
        $validated = $request->validate([
            'quiz_title' => 'required|string|max:255',
            'category' => 'required|string',
            'questions' => 'nullable|array|min:1',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.options' => 'required|array|min:4',
            'questions.*.correctAnswer' => 'required|integer|min:0|max:3',
        ]);

        $quiz = Quiz::find($quizId);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        $quiz->update([
            'title' => $validated['quiz_title'],
            'category' => $validated['category'],
        ]);

        if (isset($validated['questions'])) {
            $quiz->questions()->delete();

            foreach ($validated['questions'] as $questionData) {
                $question = Question::create([
                    'quiz_id' => $quiz->id,
                    'question' => $questionData['question'],
                    'correct_answer' => $questionData['correctAnswer'],
                ]);

                foreach ($questionData['options'] as $option) {
                    $question->options()->create(['text' => $option]);
                }
            }
        }

        return response()->json(['message' => 'Quiz updated successfully!']);
    }

    public function delete($quizId)
    {
        $quiz = Quiz::find($quizId);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        $quiz->questions()->delete();

        $quiz->delete();

        return response()->json(['message' => 'Quiz deleted successfully!']);
    }

    public function show($quizId)
    {
        $quiz = Quiz::with('questions.options')->find($quizId);

        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }

        return response()->json($quiz);
    }
}

