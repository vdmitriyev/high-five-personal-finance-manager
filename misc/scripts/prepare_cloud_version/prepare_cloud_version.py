# coding: utf-8
from folder_iterator import FolderIterator
import fileinput, string, sys

# PROJECT_DIR = '../../../honeymoney/'
PROJECT_DIR = '../../../honeymoney/data/sql-scripts/'

CLOUD_USER_NAME = '<YOUR_CLOUD_USER_NAME>' # withou trial
CLOUD_SCHEMA_NAME = '<YOUR_CLOUD_SCHEMA_NAME>' # that is given by 'neo' tool from SAP HANA Cloud SDK

TEMPLATE_USER_NAME = '<sap-hana-cloud-username>'
TEMPLATE_SCHEMA_NAME = '<sap-hana-cloud-schema-name>'

"""
    Author  : Viktor Dmitriyev
    Goal 	: Prepeares XS Proejct to be deployed in SAP HANA Cloud 
    		  by replacing template schema name and credentials with real one.
    Date    : 15.03.2014
"""

class PrepeareCloudVersion():

	def __init__(self):
		"""
			Init method that iterates through project directory.
		"""

		fi = FolderIterator()
		self.proj_files = fi.iterate_through_catalog(PROJECT_DIR)

		print self.proj_files

	def replace_in_file(sel, proj_file, search, replace, rewrite=True):
		"""
			(obj, str) -> NoneType

			Replace "search" string with "replace" string in "proj_file".
		"""

		for line in fileinput.input(proj_file, inplace=True):			
			line = line.replace(search, replace)			
			sys.stdout.write(line)		

	def from_template_to_cloud(self, proj_file):
		"""
			(obj, str) -> NoneType

			Switching from template to cloud specific (with credentials)
		"""

		self.replace_in_file(proj_file, TEMPLATE_USER_NAME, CLOUD_USER_NAME);
		self.replace_in_file(proj_file, TEMPLATE_SCHEMA_NAME, CLOUD_SCHEMA_NAME);	

	def from_cloud_to_template(self, proj_file):
		"""
			(obj, str) -> NoneType

			Switching from template to cloud specific (with credentials)
		"""

		self.replace_in_file(proj_file, CLOUD_USER_NAME, TEMPLATE_USER_NAME);
		self.replace_in_file(proj_file, CLOUD_SCHEMA_NAME, TEMPLATE_SCHEMA_NAME);	


	def process(self, from_template_to_cloud = True):
		"""
			(NoneType) -> NoneType

			Processing.
		"""

		for directory in self.proj_files:
			print '\t' + directory
			for proj_file in self.proj_files[directory]:
				print '\t' + proj_file
				if from_template_to_cloud:
					self.from_template_to_cloud(directory + '/' + proj_file)
				else:
					self.from_cloud_to_template(directory + '/' + proj_file)
		
def main():
	"""
		(NoneType) -> NoneType

		Main method that creates objects and start processing.
	"""

	pcv = PrepeareCloudVersion()
	pcv.process(from_template_to_cloud=False)


if __name__ == '__main__':
	main()
