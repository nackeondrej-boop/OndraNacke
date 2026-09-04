# Projektový kompas

Český manažerský dashboard pro řízení CRM transformace. Aplikace propojuje AS-IS
funkce, požadavky, use casy a rozhodnutí, zobrazuje gap analýzu, milníky a stav
projektových podkladů.

## Spuštění

```bash
npm install
npm run dev
```

Datový model je v `src/domain-model.js`. Dodané projektové podklady se mají do
modelu přepisovat beze změny významu. Položky bez doloženého zdroje nebo potvrzení
musí zůstat `verified: false` a ve stavu `čeká na validaci`; aplikace je nesmí
prezentovat jako schválená fakta.
