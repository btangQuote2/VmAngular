import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggle,
  MatSlideToggleModule,
  MatSlideToggleBase,
  MatSliderChange,
  MatSlideToggleChange,
  MatChipsModule,
  MatExpansionModule
} from '@angular/material';

// // Directives

// // Pipes

// Services
import { AuthorizationService } from './services/authorization/authorization.service';

// Components
// import { BaseCardComponent } from './components/base.card.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    // MockModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    MatSlideToggleModule,
    MatChipsModule,
    FlashMessagesModule,
    MatExpansionModule
  ],
  declarations: [
    //     BaseCardComponent
    // OnlyNumber,
  ],
  providers: [
    AuthorizationService
    // DateFlyoutService,
    // ProjectSummaryService
  ],
  exports: [
    // BaseCardComponent,
    // DaypickerFlyoutComponent,
    // // EChartsDirective,
    // MapComponent,
    // SlimScrollDirective,
    // TextHighlightDirective,
    // WeekSelectorComponent,
    // BaseCardComponent,
    // StatusPipe,
    // DateToWeekdayPipe,
    // KeysPipe,
    // CommentsComponent,
    // PopoverComponent,
    // DynamicInjectionDirective,
    // ClickCloseDirective,
    // NumericPrecisionPipe,
    // CloseDateFlyoutDirective,
    // TimeInputDirective,
    // TimeFormatPipe,
    // ConfirmationDialogComponent,
    // NotesEntryDialogComponent,
    // TimeCardTimeDetailComponent,
    // TimeRecordDetailModalComponent,
    // CustomViewSettingComponent
  ]
})
export class SharedHomeModule {}
