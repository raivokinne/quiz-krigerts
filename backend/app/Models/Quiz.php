<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['title', 'category', 'user_id'];

    /**
     * Get the questions for the quiz.
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
