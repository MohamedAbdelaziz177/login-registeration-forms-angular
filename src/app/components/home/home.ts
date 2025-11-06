import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery = '';
  selectedFilter = 'all';
  selectedSort = 'newest';

  // Stats
  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;

  ngOnInit() {
    this.loadSampleTasks();
    this.updateStats();
  }

  constructor() {
    this.loadSampleTasks();
  }

  loadSampleTasks() {
    this.tasks = [
      {
        id: 1,
        name: 'Design Homepage Layout',
        description: 'Create responsive design for the main homepage with modern UI components',
        deadline: new Date('2024-02-15'),
        priority: 'high',
        category: 'Design',
        completed: false,
        imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop',
        assignee: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 2,
        name: 'API Integration',
        description: 'Integrate backend APIs with frontend application',
        deadline: new Date('2024-02-20'),
        priority: 'medium',
        category: 'Development',
        completed: false,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
        assignee: {
          name: 'Sarah Smith',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 3,
        name: 'User Testing',
        description: 'Conduct user testing sessions and gather feedback',
        deadline: new Date('2024-02-10'),
        priority: 'high',
        category: 'Testing',
        completed: true,
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
        assignee: {
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 4,
        name: 'Documentation',
        description: 'Write comprehensive documentation for the new features',
        deadline: new Date('2024-02-25'),
        priority: 'low',
        category: 'Documentation',
        completed: false,
        assignee: {
          name: 'Emily Brown'
        }
      },
      {
        id: 5,
        name: 'Bug Fixing',
        description: 'Fix critical bugs reported in the production environment',
        deadline: new Date('2024-02-08'),
        priority: 'high',
        category: 'Development',
        completed: false,
        assignee: {
          name: 'Alex Wilson',
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 6,
        name: 'Team Meeting',
        description: 'Weekly team sync meeting to discuss progress and blockers',
        deadline: new Date('2024-02-09'),
        priority: 'medium',
        category: 'Meeting',
        completed: true,
        assignee: {
          name: 'Lisa Anderson'
        }
      }
    ];

    this.filteredTasks = [...this.tasks];
  }

  updateStats() {
    this.totalTasks = this.tasks.length;
    this.pendingTasks = this.tasks.filter(task => !task.completed).length;
    this.completedTasks = this.tasks.filter(task => task.completed).length;
  }

  filterTasks() {
    let filtered = this.tasks;

    // Apply filter
    if (this.selectedFilter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (this.selectedFilter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (this.selectedFilter === 'urgent') {
      filtered = filtered.filter(task => task.priority === 'high' && !task.completed);
    }

    // Apply search
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.name.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered = this.sortTasksList(filtered);

    this.filteredTasks = filtered;
  }

  sortTasks() {
    this.filteredTasks = this.sortTasksList(this.filteredTasks);
  }

  sortTasksList(tasks: Task[]): Task[] {
    switch (this.selectedSort) {
      case 'newest':
        return tasks.sort((a, b) => b.id - a.id);
      case 'oldest':
        return tasks.sort((a, b) => a.id - b.id);
      case 'deadline':
        return tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      default:
        return tasks;
    }
  }

  searchTasks() {
    this.filterTasks();
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.updateStats();
    this.filterTasks();
  }

  createNewTask() {
    // Implement create task logic
    alert('Create new task functionality would open a modal or navigate to task creation page');
  }

  editTask(task: Task) {
    // Implement edit task logic
    alert(`Edit task: ${task.name}`);
  }

  deleteTask(task: Task) {
    if (confirm(`Are you sure you want to delete "${task.name}"?`)) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.updateStats();
      this.filterTasks();
    }
  }

  isOverdue(deadline: Date): boolean {
    return new Date() > deadline;
  }

  formatDeadline(deadline: Date): string {
    const now = new Date();
    const taskDate = new Date(deadline);
    const diffTime = taskDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `In ${diffDays} days`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }
}

interface Task {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  imageUrl?: string;
  assignee: {
    name: string;
    avatar?: string;
  };
}

