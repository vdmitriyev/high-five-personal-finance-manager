About
=====
"Personal Finance Manager" (also called as Honey Money).

Short History
=============
Initially project was started by the team ["High Five"](http://wiki.scn.sap.com/wiki/display/events/Team+05+-+The+New+Bank+1) on [SAP InnoJam CeBIT 2014](http://wiki.scn.sap.com/wiki/display/events/SAP+InnoJam+CeBIT+2014) competition and according to the results selected as one of the 4 finalists out of 12.

Contributors (credits):
======================
* Jacob Burns ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/gb.png "Great Britain")
* Dominik Dür ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/li.png "Liechtenstein")
* Viktor Dmitriyev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/kz.png "Kazakhstan")
* Georg Krenn ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/at.png "Kazakhstan")
* Breda Lever ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/sl.png "Slovenia")
* Loina Prifti ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/ge.png "Germany")
* Thomas Sugarev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/gb.png "Great Britain")
* Christian Weait ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/dk.png "Denmark")
* Anton Zubarev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/readme-flags/misc/country-flags/ru.png "Russia")

How To Start
============
* Create proper XS Project in SAP HANA Studio
* Connect new created project to SAP HANA
* Run command line and move to the created workspace with XS Project inside
* git clone current repository
```
git clone https://github.com/vdmitriyev/high-five-personal-finance-manager.git
```

Project Structure
=================
* Directory 'data' contains ready to use data and data generators;
* Directory 'honeymoney' contains SAP HANA Studio XS Project that must be imported into database;

Data Import
===========
* Data should be imported from /data/ready_data/*
* How to import data to SAP HANA from local CSV please check this [pdf](https://github.com/vdmitriyev/saphana-demos-bi2course-vlba/blob/master/demo-import-csv-data/import-csv-data.pdf)
* Schema that is used by default is "DEMOUSER00"
* Table names: "TBL_TRANS_DATA", "TBL_USERS"

Known Problems and Drawbacks
============================
* Most parts of the code were written an hurry =).

TO-DO
============================
* Multiple users
* SAP HANA Cloud support
* Data import automation

