import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent implements OnInit {
  exercises: any[] = [];
  error: any = null;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadExercises();
  }

  async loadExercises() {
    this.loading = true;
    this.error = null;
    try {
      const headers = new HttpHeaders({
        'X-Api-Key': environment.apiKey,
      });
      this.http
        .get<any[]>('https://api.api-ninjas.com/v1/exercises?muscle=biceps', {
          // Modifier les paramètres de requête selon vos besoins
          headers: headers,
        })
        .subscribe({
          next: (data) => {
            this.exercises = data;
          },
          error: (error: HttpErrorResponse) => {
            this.error = error;
          },
        });
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      this.loading = false;
    }
  }
}
