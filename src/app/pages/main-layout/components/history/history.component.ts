import { Component, OnInit } from '@angular/core';
import { collection, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { getDocs } from 'firebase/firestore';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [MarkdownService],
})
export class HistoryComponent implements OnInit {
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  paramsId: string = '';

  isLoading: boolean = false;
  tours: Array<any> = [];
  municipalitiesList: Array<any> = [];

  municipalitiesFilter: Array<any> = [];
  public searchValue: any;
  public selectedFilter: string = '';
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
    });

    // if (this.paramsId) {
    //   this.getMunicipalities();
    // this.getToursSpecific();
    //   return;
    // }
    this.isLoading = true;
    this.getMunicipalities();
    this.getTours();
  }

  searchFilter(event: any) {
    this.getMunicipalities();
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '' || filterValue == 'All') {
      this.isLoading = false;

      this.getMunicipalities();
      this.searchValue = '';
      return;
    } else {
      setTimeout(() => {
        this.isLoading = false;

        this.municipalitiesList = this.municipalitiesList.filter(
          (res: any) =>
            res.municipality
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()) ||
            res.mayor.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }, 1000);
    }
  }

  async filter(event: any) {
    if (event == 'all') {
      this.selectedFilter = 'Filter';

      this.getMunicipalities();
      return;
    }
    this.isLoading = true;

    this.getMunicipalities();

    setTimeout(() => {
      this.selectedFilter = event;
      this.isLoading = false;
      this.municipalitiesList = this.municipalitiesList.filter((res: any) =>
        res.municipality.toLowerCase().includes(event.toLowerCase())
      );
    }, 500);
  }

  getMunicipalities() {
    this.isLoading = true;
    const tourQuery = collection(this.firestore, 'history');
    getDocs(tourQuery).then((res: any) => {
      this.municipalitiesList = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
      this.municipalitiesFilter = this.municipalitiesList;
      this.isLoading = false;

      // this.spinner.hide();
    });
  }

  getTours() {
    const tourQuery = collection(this.firestore, 'tours');
    // const q = query(tourQuery, where('locationId', '==', );

    getDocs(tourQuery).then((res: any) => {
      this.tours = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      this.isLoading = false;
    });
  }
  getToursSpecific(locationId: any) {
    const tourQuery = collection(this.firestore, 'tours');
    const q = query(tourQuery, where('locationId', '==', locationId));

    getDocs(q).then((res: any) => {
      return [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];
    });
  }
}
