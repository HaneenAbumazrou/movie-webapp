<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Retrieve all contacts
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts, 200);
    }

    // Retrieve a single contact by ID
    public function show($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found.'], 404);
        }

        return response()->json($contact, 200);
    }

    // Delete a contact by ID
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found.'], 404);
        }

        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully.'], 200);
    }
}
