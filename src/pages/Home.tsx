import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newListTasks: Task[] = [];

    let newTask: Task  =  {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    newListTasks.push(...tasks);
    newListTasks.push(newTask);

    setTasks(newListTasks);
  }

  function handleToggleTaskDone(id: number) {
    const newTask = tasks.map(task => ({ ...task}));
    const changedTask = newTask.find((task) => task.id == id);

    if(changedTask?.done == false) {
      changedTask.done = true;
    } else if(changedTask?.done == true) {
      changedTask.done = false;
    }

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(item => item.id !== id);
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})