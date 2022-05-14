import os
# os.system('pip3 install pandas')
# os.system('pip3 install matplotlib')
# os.system('pip3 install sklearn')


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split


path=os.getcwd()
dataset = pd.read_csv(os.path.join(path,'python','Placement_Data_Full_Class.csv'))

# print(dataset)
# dont need 

dataset = dataset.drop('sl_no', axis=1)
dataset = dataset.drop('salary', axis=1)

# changing data type 
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

# Now we will apply codes on some of these columns to convert their text values to numerical values.

dataset["gender"] = dataset["gender"].cat.codes
dataset["ssc_b"] = dataset["ssc_b"].cat.codes
dataset["hsc_b"] = dataset["hsc_b"].cat.codes
dataset["degree_t"] = dataset["degree_t"].cat.codes
dataset["workex"] = dataset["workex"].cat.codes
dataset["specialisation"] = dataset["specialisation"].cat.codes
dataset["status"] = dataset["status"].cat.codes
dataset["hsc_s"] = dataset["hsc_s"].cat.codes

# Now to split the dataset into features and values using iloc() function:

X = dataset.iloc[:, :-1].values
Y = dataset.iloc[:, -1].values

# Now we will split the dataset into train and test data which will be used to check the efficiency later.

X_train, X_test, Y_train, Y_test = train_test_split(X, Y,test_size=0.2)

from sklearn.linear_model import LogisticRegression
#  Now we need to train our model for which we will need to import a file, 
# and then we will create a classifier using sklearn module.
#  Then we will check the accuracy of the model.
clf = LogisticRegression(random_state=0, solver='lbfgs',max_iter=1000).fit(X_train,Y_train)

# printing the acc
clf.score(X_test, Y_test)


# Once we have trained the model, we will check it giving some random values:
clf.predict([[0, 87, 0, 95, 0, 2, 78, 2, 0, 0, 1, 0]])
 
# To gain a more nuanced understanding of our model’s performance we need to make a confusion matrix.
# A confusion matrix is a table with two rows and two columns that reports the number of false positives, false negatives,
# true positives, and true negatives.  
# To get the confusion matrix it takes in two arguments: 
# The actual labels of your test set y_test and predicted labels. 
# The predicted labels of the classifier are stored in y_pred as follows:
Y_pred = clf.predict(X_test)


# evaluation of the classifier
from sklearn.metrics import confusion_matrix, accuracy_score

# Finally, we have y_pred, so we can generate the confusion matrix:

print(confusion_matrix(Y_test, Y_pred))
 
# display accuracy
print(accuracy_score(Y_test, Y_pred))
