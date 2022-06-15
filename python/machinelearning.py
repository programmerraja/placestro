import os
# os.system('pip3 install pandas')
# os.system('pip3 install matplotlib')
# os.system('pip3 install sklearn')


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split


path=os.getcwd()
dataset = pd.read_csv(os.path.join(path,'Placement_Data_Full_Class.csv'))

# print(dataset)
# dont need 

dataset = dataset.drop('sl_no', axis=1)
print(dataset)

# changing data type 
# dataset["gender"] = dataset["gender"].astype('category')
dataset["sslc"] = dataset["sslc"].astype('category')
dataset["hsslc"] = dataset["hsslc"].astype('category')
dataset["sem1"] = dataset["sem1"].astype('category')
dataset["sem2"] = dataset["sem2"].astype('category')
dataset["sem3"] = dataset["sem3"].astype('category')
dataset["sem4"] = dataset["sem4"].astype('category')
dataset["sem5"] = dataset["sem5"].astype('category')
dataset["sem6"] = dataset["sem6"].astype('category')
dataset["sem7"] = dataset["sem7"].astype('category')
dataset["sem8"] = dataset["sem8"].astype('category')
dataset["exam"] = dataset["exam"].astype('category')
dataset["status"] = dataset["status"].astype('category')
# print(dataset.dtypes)


# labelling the columns

# Now we will apply codes on some of these columns to convert their text values to numerical values.

# dataset["gender"] = dataset["gender"].cat.codes
dataset["sslc"] = dataset["sslc"].cat.codes
dataset["hsslc"] = dataset["hsslc"].cat.codes
dataset["sem1"] = dataset["sem1"].cat.codes
dataset["sem2"] = dataset["sem2"].cat.codes
dataset["sem3"] = dataset["sem3"].cat.codes
dataset["sem4"] = dataset["sem4"].cat.codes
dataset["sem5"] = dataset["sem5"].cat.codes
dataset["sem6"] = dataset["sem6"].cat.codes
dataset["sem7"] = dataset["sem7"].cat.codes
dataset["sem8"] = dataset["sem8"].cat.codes
dataset["exam"] = dataset["exam"].cat.codes
dataset["status"] = dataset["status"].cat.codes

# Now to split the dataset into features and values using iloc() function:

X = dataset.iloc[:, :-1].values
Y = dataset.iloc[:, -1].values
# Now we will split the dataset into train and test data which will be used to check the efficiency later.

X_train, X_test, Y_train, Y_test = train_test_split(X, Y,test_size=0.2)

print(dataset)
from sklearn.linear_model import LogisticRegression
# Now we need to train our model for which we will need to import a file, 
# and then we will create a classifier using sklearn module.
#  Then we will check the accuracy of the model.
# .fit mean it learning
clf = LogisticRegression(random_state=0, solver='lbfgs',max_iter=1000).fit(X_train,Y_train)

# printing the acc
# clf.score(X_test, Y_test)


# Once we have trained the model, we will check it giving some random values:

print(clf.predict([[100,200,3,3,3,3,3,3,3,3,1]]),"ss")
 
# To gain a more nuanced understanding of our model’s performance we need to make a confusion matrix.
# A confusion matrix is a table with two rows and two columns that reports the number of false positives, false negatives,
# true positives, and true negatives.  
# To get the confusion matrix it takes in two arguments: 
# The actual labels of your test set y_test and predicted labels. 
# The predicted labels of the classifier are stored in y_pred as follows:
# Y_pred = clf.predict(X_test)
# print(Y_pred)


# evaluation of the classifier
# from sklearn.metrics import confusion_matrix, accuracy_score

# Finally, we have y_pred, so we can generate the confusion matrix:

# print(confusion_matrix(Y_test, Y_pred))
 
# display accuracy
# print(accuracy_score(Y_test, Y_pred))
