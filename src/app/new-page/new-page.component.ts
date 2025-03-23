import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { db, Airline } from '../app-db';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent implements OnInit {
  airlines: Airline[] = [];
  error: any = null;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAirlines();
  }

  async loadAirlines() {
    this.loading = true;
    this.error = null;
    try {
      const storedAirlines = await db.airlines.toArray();
      if (storedAirlines.length > 0) {
        this.airlines = storedAirlines;
      } else {
        const headers = new HttpHeaders({
          'X-Api-Key': 'MgINN0HkQsTrL3aE38+3fA==mfkbvFf1hfiSoeAy', // Remplacez par votre clé API réelle
        });
        this.http
          .get<Airline[]>('https://api.api-ninjas.com/v1/airlines', {
            headers: headers,
          })
          .subscribe({
            next: async (data) => {
              await db.airlines.bulkAdd(data);
              this.airlines = data;
            },
            error: (error: HttpErrorResponse) => {
              this.error = error;
            },
          });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      this.loading = false;
    }
  }
}
