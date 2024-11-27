<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Ensure these paths are included for CORS

    'allowed_methods' => ['*'],  // Allow all methods

    'allowed_origins' => ['http://localhost:5173'],  // Your React frontend URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,  // Important: This must be set to `true` for Sanctum to work with cookies

];
