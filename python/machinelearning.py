import os
os.system('pip install pandas')
os.system('pip install matplotlib')
os.system('pip install sklearn')


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
path=os.getcwd()
dataset = pd.read_csv(os.path.join(path,'python','Placement_Data_Full_Class.csv'))
# print(dataset)
dataset = dataset.drop('sl_no', axis=1)
dataset = dataset.drop('salary', axis=1)
dataset["gender"] = dataset["gender"].astype('category')
dataset["ssc_b"] = dataset["ssc_b"].astype('category')
dataset["hsc_b"] = dataset["hsc_b"].astype('category')
dataset["degree_t"] = dataset["degree_t"].astype('category')
dataset["workex"] = dataset["workex"].astype('category')
dataset["specialisation"] = dataset["specialisation"].astype('category')
dataset["status"] = dataset["status"].astype('category')
dataset["hsc_s"] = dataset["hsc_s"].astype('category')
# print(dataset.dtypes)


# labelling the columns
dataset["gender"] = dataset["gender"].cat.codes
dataset["ssc_b"] = dataset["ssc_b"].cat.codes
dataset["hsc_b"] = dataset["hsc_b"].cat.codes
dataset["degree_t"] = dataset["degree_t"].cat.codes
dataset["workex"] = dataset["workex"].cat.codes
dataset["specialisation"] = dataset["specialisation"].cat.codes
dataset["status"] = dataset["status"].cat.codes
dataset["hsc_s"] = dataset["hsc_s"].cat.codes

X = dataset.iloc[:, :-1].values
Y = dataset.iloc[:, -1].values

from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(X, Y,test_size=0.2)

from sklearn.linear_model import LogisticRegression
 
clf = LogisticRegression(random_state=0, solver='lbfgs',max_iter=1000).fit(X_train,Y_train)

# printing the acc
clf.score(X_test, Y_test)

clf.predict([[0, 87, 0, 95, 0, 2, 78, 2, 0, 0, 1, 0]])

Y_pred = clf.predict(X_test)


# evaluation of the classifier
from sklearn.metrics import confusion_matrix, accuracy_score
 
# display confusion matrix
print(confusion_matrix(Y_test, Y_pred))
 
# display accuracy
print(accuracy_score(Y_test, Y_pred))
