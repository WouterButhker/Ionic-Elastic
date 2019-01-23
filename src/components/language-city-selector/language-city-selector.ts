import { Component } from '@angular/core';
import { ViewController, Events } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";

/**
 * Generated class for the LanguageCitySelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'language-selector',
    templateUrl: 'language-city-selector.html'
})
export class LanguageCitySelectorComponent {

    selectedCity: string;
    selectedLanguage: string;
    cities: object[];

    constructor(private event: Events,
                public viewCtrl: ViewController,
                public translate: TranslateService,
                public dataManager: DataManagerProvider) {



        this.selectedCity = this.dataManager.city;
        this.selectedLanguage = this.dataManager.language;



        this.cities = this.dataManager.getCityData();

    }

    cancelLanguage() {
        this.translate.use(this.dataManager.language); // revert to original language
        this.viewCtrl.dismiss();
    }

    // gets executed when user clicks save
    saveLanguage() {

        console.log("---------------");
        console.log("Language Selector component");
        console.log("Changed Language to: " + this.selectedLanguage);
        console.log("Changed city to: " + this.selectedCity);
        console.log("Changed navBarColor to: " + this.getNavBarColor());
        console.log("Changed Flag to: " + this.getCityByLanguage(this.selectedLanguage)['image']);


        if (this.getCityByName(this.selectedCity)['language'] != this.selectedLanguage && this.selectedLanguage != "English") {

            this.dataManager.language = this.getCityByName(this.selectedCity)['language'];
            this.dataManager.flag = this.getCityByLanguage(this.dataManager.language)['image'];
            console.log("LANGUAGE ERROR");
            console.log("Switching to " + this.dataManager.language + " and " + this.dataManager.flag);
        } else {
            this.dataManager.language = this.selectedLanguage;
            this.dataManager.flag = this.getCityByLanguage(this.selectedLanguage)['image'];
        }

        console.log("---------------");


        this.dataManager.city = this.selectedCity;
        this.dataManager.color = this.getNavBarColor();



        this.event.publish("Language + city");

        this.viewCtrl.dismiss()
    }

    getCityByName(cityName) { // get the city of this.cities by name
        if (cityName == "Almelo") {
            return this.cities[0];
        } else if (cityName == "Nordhorn") {
            return this.cities[1];
        } else if (cityName == "Zelow") {
            return this.cities[2];
        } else if (cityName == "Valasske") {
            return this.cities[3];
        }
    }

    getCityByLanguage(language) { // get the city of this.cities by name
        if (language == "Dutch") {
            return this.cities[0];
        } else if (language == "German") {
            return this.cities[1];
        } else if (language == "Polish") {
            return this.cities[2];
        } else if (language == "Czech") {
            return this.cities[3];
        } else {
            return {image: this.dataManager.imgBasePath + "united-kingdom.png"}
        }
    }

    getNavBarColor() {
        // change navbar color
        if (this.selectedCity == "Almelo") {
            return "almelo_green";
        } else if (this.selectedCity == "Nordhorn") {
            return "primary";
        } else if (this.selectedCity == "Zelow") {
            return "almelo_pink";
        } else if (this.selectedCity == "Valasske") {
            return "almelo_orange"
        }
    }

    changeButtonLang() {
        this.translate.use(this.selectedLanguage);
        console.log("LANGUAGE CHANGED")
    }
}