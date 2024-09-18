import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {CommonModule, Location} from '@angular/common';
import {Ripple} from "primeng/ripple";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {UsersService} from "../users.service";
import {DropdownModule} from "primeng/dropdown";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    FloatLabelModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MatInput
  ],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
  id = 0;
  isCreateMode = false;
  form: FormGroup = this.fb.group({
    titulo: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    ponderacion_baja: ["", [Validators.required]],
    ponderacion_alta: ["", [Validators.required]],
    role_id: ["", [Validators.required]],
  });
  subscriptions: Subscription[] = [];
  roles: any = [];

  constructor(
    private _userService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
  ) {
    this.subscriptions.push(
      this._activatedRoute.params.subscribe(params => {
        this.isCreateMode = params['id'] == null;
        this.id = params['id'];
        this.destinatarios()
      })
    );

  }

  ngOnInit(): void {
    console.log(this.form.controls)
    if (!this.isCreateMode) {
      this._userService.show(this.id)
        .subscribe((res: any) => {
          this.form!.reset(res);
        });
    }
  }

  destinatarios() {
    this._userService.destinatarios().subscribe((res: any) => {
      this.roles = res;
    });
  }

  onSubmit() {
    let controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsDirty()
      );
      return;
    }
    let editedUser = this.form.value;

    if (this.isCreateMode) {
      this.addUsuario(editedUser);
    } else {
      this.updateUsuario(this.id, editedUser);
    }
  }

  addUsuario(user: any) {
    this._userService.create(user).subscribe(_ => {
      this.backRoute()
    });
  }

  updateUsuario(id: any, user: any) {
    this._userService.update(id, user).subscribe(_ => {
      this.backRoute()
    });
  }

  backRoute() {
    this._location.back();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    let control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty);
  }


}
