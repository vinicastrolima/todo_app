<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Lista todas as tarefas do usuário logado
    public function index(Request $request)
    {
        return response()->json($request->user()->tasks()->latest()->get());
    }

    // Cria uma nova tarefa
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = $request->user()->tasks()->create($data);

        return response()->json($task, 201);
    }

    // Atualiza uma tarefa existente
    public function update(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'is_done' => 'boolean'
        ]);

        $task->update($data);

        return response()->json($task);
    }

    // Deleta uma tarefa
    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Tarefa removida com sucesso.']);
    }

    // Altera o status de "concluído"
    public function toggleStatus(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->is_done = !$task->is_done;
        $task->save();

        return response()->json($task);
    }
}
