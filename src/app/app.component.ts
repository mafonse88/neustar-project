import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'neustar-project';
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
    this.jsonFile = this.validateJsonInput(form.value.jsonTxt); // JSON.parse(form.value.jsonTxt);

    if (!this.jsonFile) {
      return;
    }

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

    this.categoryCount = [
      { category: 'PERSON', count: this.personCount++ },
      { category: 'PLACE', count: this.placeCount++ },
      { category: 'ANIMAL', count: this.animalCount++ },
      { category: 'COMPUTER', count: this.computerCount++ },
      { category: 'OTHER', count: this.otherCount++ }
    ];

    this.isReady = true;
    // console.log(this.cleanArray);
    // console.log(this.categoryCount);
  }

  /**
   * This method validates and parsed the json input
   * @param json - json string to be parsed and validated
   */
  validateJsonInput(json: string) {
    let parsedJson;
    try {
      if (!json) {
        this.jsonErrorMsgs.push('JSON is empty. Please try again');
        this.showError = true;
        return;
      } else {
        parsedJson = JSON.parse(json);
        if (!Array.isArray(parsedJson)) {
          this.jsonErrorMsgs.push('JSON has to be an array. Please try again');
          this.showError = true;
          return;
        }
      }
      return parsedJson;
    } catch (error) {
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
    this.jsonTxt = '';
    this.isReady = false;
  }
}
