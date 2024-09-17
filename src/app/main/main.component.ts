import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoadingComponent} from "../share/components/loading/loading.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, LoadingComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
}
