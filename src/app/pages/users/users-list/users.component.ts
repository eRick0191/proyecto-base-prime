import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {Button, ButtonDirective} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {UsersService} from "../users.service";
import {PrimeNGConfig} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputIconModule, InputTextModule, ButtonDirective, PasswordModule, FormsModule, Button, Ripple, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users!: any[];
  columns!: any[];
  loading: boolean = true;
  searchValue: string | undefined
  filterHidden = true;

  constructor(private _userService: UsersService, private primeConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primeConfig.ripple = true;
    this._userService.getUsers().subscribe((res: any) => {
      this.loading = false;
      this.users = res.data;
    })
    this.columns = [
      {field: 'nombre', header: 'Name', width: 25},
      {field: 'apellido_paterno', header: 'Last Name', width: 20},
      {field: 'email', header: 'Email', width: 25},
      {field: 'telefono', header: 'Phone number', width: 20},
    ];

  }

  event(ev: any) {
    return ev.value;
  }

  clearTable(table: Table){
    table.clear();
    this.searchValue = '';
  }

}
