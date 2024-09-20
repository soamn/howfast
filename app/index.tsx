import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";

interface Task {
  id: string;
  title: string;
  description: string;
  emoji: string;
  completed: boolean;
}

const TaskApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("✏️"); // Default emoji
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(true); // New state for input visibility

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) {
        setTaskList(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: task,
        description,
        emoji,
        completed: false,
      };
      const updatedTasks = [...taskList, newTask];
      setTaskList(updatedTasks);
      saveTasks(updatedTasks);
      setTask("");
      setDescription("");
      setEmoji("✏️");
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleComplete = (taskId: string) => {
    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
    saveTasks(updatedTasks);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <View
        style={styles.emojiContainer}
        onTouchEnd={() => {
          toggleComplete(item.id);
        }}
      >
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.title}
        </Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleComplete(item.id)}
        color={item.completed ? "#28a745" : undefined}
        style={styles.checkbox}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity
        onPress={() => setIsInputVisible((prev) => !prev)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>
          {isInputVisible ? "❌" : "✏️"}
        </Text>
      </TouchableOpacity>
      {isInputVisible && (
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            value={task}
            onChangeText={setTask}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter a description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter an emoji"
            value={emoji}
            onChangeText={setEmoji}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F3E4",
    paddingHorizontal: 20,
  },
  taskList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
  },
  emojiContainer: {
    width: 120,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    borderBottomEndRadius: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  emoji: {
    fontSize: 40,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 24,
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  checkbox: {
    marginRight: 20,
    height: 25,
    width: 25,
  },
  deleteButton: {
    fontSize: 24,
  },
  addTaskContainer: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    borderRadius: 50,
    height: 50,
    fontSize: 16,
    backgroundColor: "#F6F3E4",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#333",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    alignItems: "center",
    marginVertical: 10,
  },
  toggleButtonText: {
    fontSize: 24,
    color: "#333",
  },
});

export default TaskApp;
