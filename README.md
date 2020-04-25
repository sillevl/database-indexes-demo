# MySQL/MariaDB indexes demo

A small JavaScript applications that demonstrates the
performance difference between normal and indexed columns.

This example contains an English dictionary containing 176.023 words and there definitions.
Each word is stored inside a normal and indexed column, containing the exact same information.

This database enables to compare `SELECT` queries against normal and indexed columns.

## Setup

Clone this repository:

```bash
git clone git@github.com:sillevl/database-indexes-demo.git
cd database-indexes-demo
```

### Install the example database

This example contains a database with the English dictionary. It contains
a list with English words and there definitions.

Import the database by connecting to your database with the `mysql` command and execute the following statement:

```sql
source sql/englishdictionary.sql
```

### Install npm dependencies

```bash
npm install
```

## Usage

Run the default example

```bash
npm run
```

### Custom number of searches

You can choose a custom number of words to search for. For example if you want 1000 iterations:

```bash
npm run -- --number 1000
```

Output:

```text
Connecting to MySQL/MariaDB
Picking 100 random words
[
  'Cypraea',      'Warrant',        'Swinefish',
  'Etymology',    'Hawk',           'Ruffleless',
  'Lusting',      'Haustella',      'Shet',
  'Pretenseless', 'Drecche',        'Rodsman',
  'Measure',      'Potation',       'Pearlaceous',
  'Indecinably',  'Cheatable',      'Proin',
  'Perisse',      'Ligula',         'Print',
  'Saivism',      'Killed',         'On',
  'Gor-belly',    'High-flown',     'Roughstrings',
  'Oceanic',      'Mot',            'Gateless',
  'Wave',         'Asking',         'Riven',
  ...
]
 ████████████████████████████████████████ 100% | ETA: 0s | 100/100
 ████████████████████████████████████████ 100% | ETA: 0s | 100/100
Processed 100 queries in 2.272 seconds (44.01/second)
Processed 100 queries in 0.062 seconds (1612.90/second)
Indexed search is 36.65 times faster than normal
```
