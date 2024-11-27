<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['quiz_id', 'question', 'correct_answer'];

    /**
     * Get the options for the question.
     */
    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
