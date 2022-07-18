import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { CreateMessageRoutingModule } from './create-message-routing.module';
import { CreateMessageComponent } from './create-message.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateMessageRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressButtonsModule,
  ],
})
export class CreateMessageModule {}
