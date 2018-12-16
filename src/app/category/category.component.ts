import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  jsonTxt: '';
  validCategories = ['PERSON', 'PLACE', 'ANIMAL', 'COMPUTER', 'OTHER'];

  isReady = false;

  categoryCount = [];

  cleanArray = [];

  jsonFile: JSON[];

  personCount = 0;
  placeCount = 0;
  animalCount = 0;
  computerCount = 0;
  otherCount = 0;
  showError = false;
  jsonErrorMsgs = [];

  /**
   * Method that gets executed when the json is entered and the user click on submit.
   * We get the category count
   * @param {NgForm} json - we get the input thru the form
   *
   */
  onProcessJson(form: NgForm) {
    this.showError = false;
    this.jsonErrorMsgs = [];
    const jsonInput = form.value.jsonTxt;
    this.clearCounters();
    // this.jsonFile = form.value.jsonTxt; // JSON.parse(form.value.jsonTxt);

    if (this.validateJsonInputIsNotEmpty(jsonInput)) {
      const parsedJson = this.parseJsonFile(jsonInput);

      if (this.validateParseJsonFile(parsedJson)) {
        this.jsonFile = parsedJson;
        this.jsonFile.forEach(keyValuePair => {
          // Validate if object already exists in array.
          const categoryTitle = Object.keys(keyValuePair)[0];

          // Validate if it's s valid category
          if (this.validCategories.indexOf(categoryTitle.toUpperCase()) < 0) {
            this.jsonErrorMsgs.push('The following category is invalid: ' + categoryTitle);
            this.showError = true;
          } else {
            const exists = this.cleanArray.filter(
              x =>
                x.category === categoryTitle &&
                x.value === keyValuePair[categoryTitle]
            );

            if (exists.length === 0) {
              this.cleanArray.push({
                category: categoryTitle,
                value: keyValuePair[categoryTitle]
              });
            }

            const cat = this.validCategories.filter(x => x === categoryTitle)[0];
            if (cat === 'PERSON') {
              this.personCount++;
            } else if (cat === 'PLACE') {
              this.placeCount++;
            } else if (cat === 'ANIMAL') {
              this.animalCount++;
            } else if (cat === 'COMPUTER') {
              this.computerCount++;
            } else if (cat === 'OTHER') {
              this.otherCount++;
            }
          }
        });
        this.isReady = true;
      }
    }

    this.categoryCount = [
      { category: 'PERSON', count: this.personCount++ },
      { category: 'PLACE', count: this.placeCount++ },
      { category: 'ANIMAL', count: this.animalCount++ },
      { category: 'COMPUTER', count: this.computerCount++ },
      { category: 'OTHER', count: this.otherCount++ }
    ];


    form.resetForm();
    // console.log(this.cleanArray);
    // console.log(this.categoryCount);
  }

  /**
   * This method validates that the input is not empty
   * @param json - json string
   */
  validateJsonInputIsNotEmpty(json: string) {
    try {
      if (!json) {
        this.jsonErrorMsgs.push('JSON is empty. Please try again');
        this.showError = true;
        return false;
      }
      return true;
    } catch (error) {
      this.jsonErrorMsgs.push('Invalid JSON. Please try again');
      this.showError = true;
    }
  }

  /**
   * This method parse the json input
   * @param jsonInput - json string
   */
  parseJsonFile(jsonInput) {
    try {
      return JSON.parse(jsonInput);
    } catch {
      this.jsonErrorMsgs.push('Invalid JSON. Please try again');
      this.showError = true;
    }
  }

  /**
   * This method validates that the parsed json has the correct format
   * @param parsedJson - json string
   */
  validateParseJsonFile(parsedJson) {
    try {
      if (!Array.isArray(parsedJson)) {
        this.jsonErrorMsgs.push('JSON has to be an array. Please try again');
        this.showError = true;
        return false;
      }
      return true;
    } catch {
      this.jsonErrorMsgs.push('Invalid JSON. Please try again');
      this.showError = true;
    }
  }

  /**
   * Clear all variables used in the application
   */
  cleanForm() {
    this.categoryCount = [];
    this.cleanArray = [];
    this.personCount = 0;
    this.placeCount = 0;
    this.animalCount = 0;
    this.computerCount = 0;
    this.otherCount = 0;
    this.showError = false;
    this.jsonErrorMsgs = [];
    this.jsonTxt = null;
    this.isReady = false;
  }

  clearCounters() {
    this.personCount = 0;
    this.placeCount = 0;
    this.animalCount = 0;
    this.computerCount = 0;
    this.otherCount = 0;
  }

}
