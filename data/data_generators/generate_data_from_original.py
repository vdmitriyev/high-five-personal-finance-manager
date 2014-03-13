# coding: utf-8
import random
import config

DATA_DIRECTORY = 'data'
META_INFO_DIRECTORY = 'meta-info'

# CONSTANS USED FOR GENERATION
RANDOM_FACTOR = 1000
NUMBER_OF_USERS = 4
SALARY_MIN = 350
SALARY_MAX = 350

"""
    Author  : Viktor Dmitriyev
    Goal 	: Data generation from mask file. Code written in hurry.
    Date    : 11.03.2014
"""

class TransDataGenerator():

	def line_to_list(self, _line, delim):
		"""
			(obj, str) -> list()

			Converting input line that suppose to be an csv to the separated list.
		"""

		result = list()		
		_line_splited = _line.split(delim)

		for value in _line_splited:
			value_stripped = value.strip().rstrip()			
			result.append(value_stripped)				
		
		return result

	def load_data_from_file(self, data_file, delim=','):
		"""
			(obj, str, list, list, boolean) -> (int, int)

			Loading data from specified file.
		"""
		
		csv_f = open(DATA_DIRECTORY + '/' + data_file, "r")
		line = csv_f.readline()
		loaded_data = {}
		index = 0
		while line:
			row = self.line_to_list(line, delim)
			loaded_data[index] = row
			index = index + 1
			line = csv_f.readline()
		csv_f.close()
		return loaded_data

	def change_date(self, date_input):
		"""
			
			Changing data for from 2013 to 2014 if month is less that march.
		"""

		changed_date = date_input

		if (int(date_input[5:7]) < 3):
			changed_date = '2014-' + date_input[5:]
				
		return changed_date

	def generate_data(self, original_data, delim=','):
		"""
			(obj, str, list, list, boolean) -> (int, int)

			Generating data from specified file.
		"""

		gen_data = []

		for index in original_data:
			try:
				new_row = []
				new_row.append(original_data[index][0])
				new_row.append(str(int(random.random() * NUMBER_OF_USERS)+1))
				
				new_row.append('-' + str(original_data[index][1]))
				new_row.append(self.change_date(original_data[index][2]))
				new_row.append(self.change_date(original_data[index][3]))

				rand_index = int(random.random() * len(config.CATEGORY_LIST_ADRESSES))				
				rand_index_address = int(random.random() * len(config.CATEGORY_LIST_ADRESSES[config.CATEGORY_LIST[rand_index]]))				
				new_row.append(config.CATEGORY_LIST[rand_index])
				new_row.append(config.CATEGORY_LIST_ADRESSES[config.CATEGORY_LIST[rand_index]][rand_index_address])				

				gen_data.append(new_row)
			except:
				pass

		return gen_data

	def print_data(self, data, delim=';', header=None):
		"""
			(obj, dict, str, str) -> None

			Printing data in CSV format.
		"""

		print header

		for row in data:
			output = ''
			for value in row:
				# print value
				output = output + str(value) + delim
			output = output[:len(output)-1]

			print output


	def add_salary(self, original_data):
		"""
			(obj, dict) -> None

			Adding salary to the data.
		"""

		dates = ['2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', 
				 '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01', '2014-01-01', '2013-02-01']

		global_unique = 321

		for user in xrange(NUMBER_OF_USERS):
			for value in xrange(len(dates)):
				global_unique = global_unique + 1
				salary = []
				salary.append(global_unique)
				salary.append(str(user + 1))
				
				if user % 2 == 0:
					salary.append(str(SALARY_MAX))
				else:
					salary.append(str(SALARY_MIN))

				salary.append(self.change_date(dates[value]))
				salary.append(self.change_date(dates[value]))
				salary.append('SALARY')
				salary.append('NO DATA')

				original_data.append(salary)

		return original_data



	def generation_process(self, original_data_file, result_data_file):
		"""
			(obj, list, list) -> None

			Generationing new data based on data from mask file.
		"""
		
		original_data = self.load_data_from_file(original_data_file)
		
		# print original_data

		generated_data = self.generate_data(original_data)
		generated_data_with_salary = self.add_salary(generated_data)

		self.print_data(generated_data_with_salary, header=config.HEADER)


		
def main():
	"""
		(NoneType) -> NoneType

		Main method that creates objects and start processing.
	"""

	generator = TransDataGenerator()
	generator.generation_process(original_data_file='original_transactions_data.csv', 
								 result_data_file='generated_data_to_load_transaction.csv')
	


if __name__ == '__main__':
	main()
