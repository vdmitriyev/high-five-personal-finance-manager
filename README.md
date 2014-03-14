About
=====
"Personal Finance Manager" (also called as Honey Money).

Short History
=============
Initially project was started by the team ["High Five"](http://wiki.scn.sap.com/wiki/display/events/Team+05+-+The+New+Bank+1) on [SAP InnoJam CeBIT 2014](http://wiki.scn.sap.com/wiki/display/events/SAP+InnoJam+CeBIT+2014) competition and according to the results selected as one of the 4 finalists out of 12.

Contributors (credits):
======================
* Jacob Burns ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/gb.png "Great Britain")
* Dominik Dür ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/li.png "Liechtenstein")
* Viktor Dmitriyev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/de.png "Germany") / ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/kz.png "Kazakhstan")
* Georg Krenn ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/at.png "Kazakhstan")
* Breda Lever ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/si.png "Slovenia")
* Loina Prifti ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/de.png "Germany") / ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/al.png "Alabania")
* Thomas Sugarev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/gb.png "Great Britain")
* Christian Weait ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/dk.png "Denmark")
* Anton Zubarev ![alt text](https://raw.github.com/vdmitriyev/high-five-personal-finance-manager/master/misc/country-flags/ru.png "Russia")

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

How to Run "HoneyMoney" inside SAP HANA Cloud Platform
======================================================
* Go through following article by [Stoyan Manchev](http://scn.sap.com/people/stoyan.manchev) to get general understanding of upcoming process ["8 Easy Steps to Develop an XS application on the SAP HANA Cloud Platform"](http://scn.sap.com/community/developer-center/cloud-platform/blog/2013/10/17/8-easy-steps-to-develop-an-xs-application-on-the-sap-hana-cloud-platform#start=100)
* Perform steps 1,2 from article mentioned above, but instead of using "hihanaxs" as application name use "cloudhoneymoney"
* During step 3 while creating project give a name to the project "honeymoney"
* Go to the workspace with created project (must contain "._SYS_REGI_settings" and "<username>trial" directories)
* Inside directory "<username>trial" remove directory "cloudhoneymoney"
* After removing directory "cloudhoneymoney" execute following command:
```
git clone https://github.com/vdmitriyev/high-five-personal-finance-manager.git cloudhoneymoney
```
* Go back to SAP HANA Studio and refresh it, now you have to see file from project that are extracted from github
* Deploy files from XS Project(the name of the project should be "honeymoney") to SAP HANA Cloud
* Go to the cockpit of SAP HANA Cloud Platform and open "HANA XS Applications" -> "Applications"  and click on link that will lead you to uploaded files of your application
* NB: do not forget to load data to instance of SAP HANA that is located in cloud and also change scripts for your SCHEMA, by default "honeymoney" uses schema "DEMOUSER00".

Known Problems and Drawbacks
============================
* Most parts of the code were written an hurry =).

TO-DO
============================
* Multiple users
* SAP HANA Cloud support
* Data import automation

