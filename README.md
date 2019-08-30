# Inez

INEZ ist ein INtelligenter EinkaufZettel, der für den
Wettbewerb von IT-Talents in Angular gebaut wurde. Die App ist in der Lage
den Eingabewert eines Users auf vorhandene Produkte zu mappen.

## Funktionsumfang

Ein Benutzer gibt über das Inputfeld einen Kaufwunsch an. Der Wunsch kann ggf.
eine Menge in der Form einer Zahl beinhalten. Das Programm untersucht den
Eingabewert auf vorhandene Zahlen und nimmt die erste gefundene Zahl, um die
Menge zu determinieren.
Des Weiteren sucht das Programm das passende Lebensmittel, welches sich in der
Eingabe des Benutzers befindet.
Die Lebensmittel sind hart kodiert im Programm zu finden.

Sollte ein Lebensmittel gefundene worden sein, so hat der Benutzer die
Möglichkeit ein passendes Produkt auszuwählen. Das ausgewählte Produkt ersetzt
die Beschreibung des Listeneintrages.

Jede Änderung an der Liste wird automatisch im LocalStorage des Browers
gespeichert.

## Start Development server

- `npm install` installert alle notwendigen Pakete
- `ng serve` for a dev server
- Navigate to `http://localhost:4200/`. The app will automatically reload if

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Aufbau des Programms

Der geschriebene Code befindes sich in `src/app`
Das Programm besteht aus folden Teilen:
- 3 Components
    - `AppComponent` Haupkomponente für den Einkaufzettel
    - `DeleteConfirmationComponent` Pop-up für die Löschbestätigung
    - `ProductSuggestionsComponent` Pop-up für die Produktvorschläge
- 3 Klassen
    - `Food` Object um ein Lebensmittel dazustellen
    - `Product` Object welches ein kaufbares Produkt abbildet
    - `ShoppingItem` Listenelement im Einkaufzettel
- 3 Servicen
    - `LocalStorageService` LocalStorage-Verwaltung
    - `ShoppingItemService` Transformiert Eingabetext zu `ShoppingItem`
    - `ProductService` Findet die passendes Produkte auf basis von
        Lebensmitteln

Die UI wurde mit [Angular Material](https://material.angular.io/) umgesetzt.

