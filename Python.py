===========================

with open("Colors.txt", rb) as open_file: #rb - read binary
	for x in open_file:
		print 'Reading Data: ' + x

#with - file closes when out of block

===========================

Streaming data - suitable for working with data one record at a time.

Each record is put into x.

===========================


n = 2
with open("Colors.txt", 'rb') as open_file:
    for j, observation in enumerate(open_file):
        if j % n==0:
            print('Reading Line: ' + str(j) + 
            ' Content: ' + observation)


===========================

Random Sampling

from random import random
sample_size = 0.25
with open("Colors.txt", 'rb') as open_file:
    for j, observation in enumerate(open_file):
        if random()<=sample_size:
            print('Reading Line: ' + str(j) + 
            ' Content: ' + observation)


	
Packages:	

	NumPy

	SciPy

	Pandas

	Matplotlib

	Sympy

===========================

s = pd.Series(np.random.randn(5), index=['a', 'b', 'c', 'd', 'e'])


import numpy as np
import pandas as pd
x = np.random.randn(2,3)
print x
df = pd.DataFrame(x,index=list('12'),columns=list('ABC'))
print df
df2 = pd.DataFrame({ 'A' : pd.Categorical(["Ben","John","Mary","Lisa"]),
'B' : pd.Series([75,80,85,95])})
print df2 # show entire dataframe
print df2['B'] # show column B
print df2[['B','A']] # show multiple columns
print df2[1:2] # show rows
print df2.iloc[0:2,0:1] # select specific cells
print df2.T # transpose

#lab 04


import pyodbc
import pandas.io.sql as psql
import string #translate
#from collections import defaultdict
import Orange
cnxn = pyodbc.connect('DRIVER={SQL Server}; SERVER=localhost; DATABASE=AdventureWorks2012; UID=sa; PWD=Q64uwr2f')
cursor = cnxn.cursor()
q = """
SELECT DISTINCT
    CUSTOMCOLUMN = STUFF((
            SELECT ', ' + REPLACE(P.NAME,',','')
			FROM SALES.SALESORDERHEADER SH1
				INNER JOIN SALES.SALESORDERDETAIL SD ON SD.SALESORDERID = SH1.SALESORDERID 
				INNER JOIN PRODUCTION.PRODUCT P ON SD.PRODUCTID = P.PRODUCTID
			WHERE SH2.CUSTOMERID = SH1.CUSTOMERID
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
FROM SALES.SALESORDERHEADER SH2

""" 
cursor.execute(q)
file = open('lab03_dm.basket', 'w')

row = cursor.fetchone()
print type(x)
line = str(row).translate(None, '\(\)')
file.write(str(line)+"\n")
while row:
    line = str(row).translate(None, '\(\)')
    #print line
    row = cursor.fetchone()
    file.write(str(line)+"\n")
cnxn.close()
file.close()

file = open('lab04_dm_result.txt', 'w')
data = Orange.data.Table("lab03_dm.basket")

rules = Orange.associate.AssociationRulesSparseInducer(data,
support=0.03)
result = "%4s %4s %s" % ("Supp", "Conf", "Rule")+"\n"
for r in rules:
    result = "%4.1f %4.1f %s" % (r.support, r.confidence, r)+"\n"
    file.write(result)
file.close()
