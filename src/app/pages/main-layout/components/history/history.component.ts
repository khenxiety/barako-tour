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
  public isShowLess: boolean = false;
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
  // pagination
  public toursPerPage: number = 5;
  public selectedPage = 1;
  municipalitiesArray: any[] = [];

  isLoading: boolean = false;
  tours: Array<any> = [];
  municipalitiesList: Array<any> = [];

  municipalitiesFilter: Array<any> = [];
  public searchValue: any;
  public selectedFilter: string = '';
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.windowUp();

    // if (this.paramsId) {
    //   this.getMunicipalities();
    // this.getToursSpecific();
    //   return;
    // }
    this.isLoading = true;
    this.getMunicipalities();
    this.getTours();
  }

  showLess() {
    this.isShowLess = this.isShowLess ? false : true;
  }
  windowUp(): void {
    window.scroll({
      top: 0,
    });
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.toursPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    console.log(this.tours);
    return Array(Math.ceil(this.tours.length / this.toursPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: any) {
    this.windowUp();

    this.selectedPage += page;
    this.slicedData();
  }
  previousPage(page: any) {
    this.windowUp();

    this.selectedPage -= page;
    this.slicedData();
  }
  slicedData() {
    let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.toursPerPage + this.toursPerPage;
    this.municipalitiesArray = [];
    this.municipalitiesArray = this.tours.slice(pageIndex, endIndex);
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
      this.municipalitiesFilter.sort((a, b) => {
        if (a.municipality < b.municipality) return -1;

        if (a.municipality > b.municipality) return 1;

        return 0;
      });
      let pageIndex = (this.selectedPage - 1) * this.toursPerPage;
      this.municipalitiesArray = this.municipalitiesList.slice(
        pageIndex,
        this.toursPerPage
      );
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
