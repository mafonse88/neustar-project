import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import {MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  let component: CategoryComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CategoryComponent,
        HeaderComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatToolbarModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  it('Should succeed since input is not empty', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.debugElement.componentInstance;

    const jsonInput = `[
      {"PERSON":"Bob Jones"},
      {"PLACE":"Washington"},
      {"COMPUTER":"Mac"}
  ]`;
    expect(component.validateJsonInputIsNotEmpty(jsonInput)).toBe(true);
  });


  it('Should succeed and parse JSON input properly', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.debugElement.componentInstance;

    const jsonInput = `[
        {"PERSON":"Bob Jones"},
        {"PLACE":"Washington"},
        {"COMPUTER":"Mac"}
    ]`;
    const jsonTest = [
      {"PERSON":"Bob Jones"},
      {"PLACE":"Washington"},
      {"COMPUTER":"Mac"}
  ];
    expect(component.parseJsonFile(jsonInput)).toEqual(jsonTest);
  });

  it('Should succeed since JSON format is valid', () => {
    const fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.debugElement.componentInstance;

    const jsonInput = `[
      {"PERSON":"Bob Jones"},
      {"PLACE":"Washington"},
      {"COMPUTER":"Mac"}
  ]`;
    expect(component.validateParseJsonFile(jsonInput)).toBe(false);
  });


});
