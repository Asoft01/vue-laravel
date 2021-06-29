<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Get Contact Details
Route::get('get_contact/{id}', 'ContactController@get_contact');

// Get Contact
Route::get('getContacts', 'ContactController@getContacts');

// Save Contacts
Route::post('save_contact', 'ContactController@save_contact');

//Update Contact 
Route::post('update_contact/{id}', 'ContactController@update_contact');

// Delete Contact 
Route::delete('deleteContact/{id}', 'ContactController@deleteContact');