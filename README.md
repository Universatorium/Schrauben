# Schrauben

Einleitung:
Dieses Projekt umfasst die Entwicklung einer Webanwendung unter Verwendung von MongoDB als Datenbank, einem Express Server als Backend-Framework, Node.js als Laufzeitumgebung und Pug als Template-Engine für die Darstellung von HTML-Inhalten. Es werden auch zusätzliche Abhängigkeiten wie chart.js für die Integration von Diagrammen verwendet.

Voraussetzungen:
Bevor Sie mit dem Projekt beginnen, stellen Sie sicher, dass folgende Voraussetzungen erfüllt sind:

a) Node.js und npm: Stellen Sie sicher, dass Sie Node.js und npm (Node Package Manager) auf Ihrem System installiert haben. Sie können die neueste stabile Version von der offiziellen Node.js-Website herunterladen und installieren.

b) MongoDB: Installieren Sie MongoDB auf Ihrem System oder nutzen Sie eine gehostete MongoDB-Dienstleistung. Stellen Sie sicher, dass Sie die Verbindungs-URL und Anmeldeinformationen für Ihre MongoDB-Datenbank bereit haben.

Die vollständige Dateistruktur des Projekts:
- Schrauben
- bin
  - www
- controllers
  - schraubenController.js
- models
  - schraube.js
- public
  - images
    - ...
  - javascripts
    - ...
  - stylesheets
    - style.css
- routes
  - index.js
  - users.js
- src
  - aquisitions.js
  - api.js
  - index.html
- views
  - details.pug
  - error.pug
  - hilfe.üug
  - index.pug
  - layout.pug
  - navbar.pug
  - startseite.pug
  - support.pug
- app.js
- README.md
- DATEISTRUKTUR.md
- SECURITY.md

Anforderungen:

Übersichts-Dashboard:
Top 3 Schrauben: Zeigt die drei Schraubenarten, die die höchsten Verkaufszahlen aufweisen.

Top 3 Hersteller: Präsentiert die drei Hersteller mit den höchsten Verkaufszahlen.

Bester Verkaufstag insgesamt: Identifiziert und zeigt den Tag mit den höchsten Gesamtverkaufszahlen an.

Erweiterte Anforderungen:
Durchschnittlich beste Verkaufstag pro Woche: Ermittelt und visualisiert den Wochentag, an dem im Durchschnitt die besten Verkaufszahlen erzielt werden.

Prozentualer Anteil der Schraubenverkäufe von Hersteller X: Berechnet und visualisiert den prozentualen Anteil der verkauften Schrauben, die von einem bestimmten Hersteller (Hersteller X) stammen.

Filter-Menü:
Das Dashboard sollte ein Filter-Menü enthalten, das den Benutzern ermöglicht, folgende spezifische Daten anzuzeigen:

Umsatz pro Schraubenart pro Monat: Zeigt den Umsatz für jede Schraubenart in einem ausgewählten Monat an.

Umsatz pro Schraubenart pro Hersteller pro Monat: Zeigt den Umsatz für jede Schraubenart eines bestimmten Herstellers in einem ausgewählten Monat an.

Gesamtumsatz pro Hersteller für einen Monat: Präsentiert den Gesamtumsatz eines Herstellers für einen ausgewählten Monat.

Hersteller Einzelansicht:

Füge pro Hersteller eine Einzelansicht hinzu, die alle relevanten Analysen (Umsatz, Menge, Trends) für diesen Hersteller darstellt.

Binde das Logo des Herstellers ein und füge die passenden Diagramme hinzu.


#Necmettin:
## Projektname: Schrauben

Die Schraubenseite ist eine Node.js-Anwendung zur Verwaltung von Schraubendaten und einem Dashboard zur Visualisierung dieser Daten.

## Installation

1. Klonen Sie das Repository auf Ihren lokalen Computer.

```bash
git clone https://github.com/Universatorium/Schrauben
```

2. Wechseln Sie in das Projektverzeichnis.

```bash
cd Schrauben
```

3. Installieren Sie die Abhängigkeiten.

```bash
npm install
```

## Anforderungen

Stellen Sie sicher, dass Ihr System die folgenden Voraussetzungen erfüllt:

- Node.js (Version ^19.8.1)
- MongoDB (Version ^5.6.0)

## Verwendung des Dashboards

1. Starten Sie die Anwendung.

```bash
npm start
```

2. Öffnen Sie den Webbrowser und navigieren Sie zur angezeigten URL, um auf das Dashboard zuzugreifen.  Standart: http://localhost:3000/

### Hauptseite

Nach dem Starten der Anwendung werden Sie zur Hauptseite des Dashboards weitergeleitet. Hier finden Sie verschiedene Funktionen und Optionen zur Verwaltung und Visualisierung von Schraubendaten, sowie eine Funktion, um die aktuelle Seite als PDF Dokument herunterzuladen.

### Daten anzeigen

Auf der Hauptseite werden verschiedene Diagramme angezeigt, die Daten zu Schrauben darstellen. Diese Diagramme umfassen:

- Top 3 Schrauben nach Verkaufsmenge: Ein Donut-Diagramm, das die Top 3 Schrauben und ihre Verkaufsmengen darstellt.

- Top 3 Hersteller: Ein Balkendiagramm, das die Top 3 Hersteller von Schrauben basierend auf Verkaufsmengen anzeigt.

- Best Day: Ein Liniendiagramm, das den Verlauf der Verkaufsmenge an jedem Tag darstellt.

- Best Day of Week: Ein Balkendiagramm, das den Durchschnitt der Verkaufsmenge an jedem Wochentag darstellt.

## Mitwirkende

- Thomash Kirsch
- Matze
- Angelo 
- Necmettin

Wir freuen uns über Beiträge von Mitwirkenden.

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.