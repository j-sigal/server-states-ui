import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin, Observable, EMPTY, from, of } from 'rxjs';
import { catchError, delay, map, mergeMap, tap } from 'rxjs/operators';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  states: any = [];
  distinct_states: any = [];
  loaded: boolean = false;
  constructor(private homeService: HomeService) { }

  
  ngOnInit(): void {

    this.loaded = false;//spinner is on
    
    //artificially create 36 separate async calls, server responds with random status
    //if we were recovering actual states, I would implement array of ids 
    const numOfBoxes = Array.from(Array(36).keys());
    const httpCalls = numOfBoxes.map(id => this.homeService.GetState()) // array of streams
    const statesList$ = forkJoin(httpCalls).pipe(
      map(results => results.map((r) => ({ code: r.code, state: r.state, color: r.color }))));

    statesList$.subscribe(res => {
      this.states = res;
      //unique values by "code"
      this.distinct_states = this.states.filter((v,i,a)=>a.findIndex(t=>(t.code === v.code))===i); 
      console.log(this.distinct_states);
      this.loaded = true;//spinner is off
    },
    err => console.log('HTTP Error', err));
  }

}
