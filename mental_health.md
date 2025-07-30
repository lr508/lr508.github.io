# Mental Health Predictor

The aim of this project will be to predict the occurrence of mental health problems of people in the dataset, given factors such as age, work stress and family history of mental health. Hopefully this will be a more orthodox project than my last one, and allow me to implement techniques that I have learned.

---

# Introduction

This is another binary classification project, with the data acquired from [https://www.kaggle.com/datasets/adilshamim8/exploring-mental-health-data/data](https://www.kaggle.com/datasets/adilshamim8/exploring-mental-health-data/data).

The process I intend to follow is:

- Import the data and decide how to handle missing values, either impution or column dropping as appropriate.
- Process the data to make it suitable for training, using ordinal encoding or one-hot encoding on the categoric variables.
- Choose an appropriate model.
- Employ some sort of metric to validate the model against.
- Use a grid search as well as altering which features are used in order to fit the best model.



```python
import pandas as pd
import math
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
```


```python
data = pd.read_csv("./train.csv")
data.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>Name</th>
      <th>Gender</th>
      <th>Age</th>
      <th>City</th>
      <th>Working Professional or Student</th>
      <th>Profession</th>
      <th>Academic Pressure</th>
      <th>Work Pressure</th>
      <th>CGPA</th>
      <th>Study Satisfaction</th>
      <th>Job Satisfaction</th>
      <th>Sleep Duration</th>
      <th>Dietary Habits</th>
      <th>Degree</th>
      <th>Have you ever had suicidal thoughts ?</th>
      <th>Work/Study Hours</th>
      <th>Financial Stress</th>
      <th>Family History of Mental Illness</th>
      <th>Depression</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>Aaradhya</td>
      <td>Female</td>
      <td>49.0</td>
      <td>Ludhiana</td>
      <td>Working Professional</td>
      <td>Chef</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>More than 8 hours</td>
      <td>Healthy</td>
      <td>BHM</td>
      <td>No</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>No</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>Vivan</td>
      <td>Male</td>
      <td>26.0</td>
      <td>Varanasi</td>
      <td>Working Professional</td>
      <td>Teacher</td>
      <td>NaN</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>3.0</td>
      <td>Less than 5 hours</td>
      <td>Unhealthy</td>
      <td>LLB</td>
      <td>Yes</td>
      <td>7.0</td>
      <td>3.0</td>
      <td>No</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>Yuvraj</td>
      <td>Male</td>
      <td>33.0</td>
      <td>Visakhapatnam</td>
      <td>Student</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>8.97</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>5-6 hours</td>
      <td>Healthy</td>
      <td>B.Pharm</td>
      <td>Yes</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>No</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>Yuvraj</td>
      <td>Male</td>
      <td>22.0</td>
      <td>Mumbai</td>
      <td>Working Professional</td>
      <td>Teacher</td>
      <td>NaN</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>Less than 5 hours</td>
      <td>Moderate</td>
      <td>BBA</td>
      <td>Yes</td>
      <td>10.0</td>
      <td>1.0</td>
      <td>Yes</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4</td>
      <td>Rhea</td>
      <td>Female</td>
      <td>30.0</td>
      <td>Kanpur</td>
      <td>Working Professional</td>
      <td>Business Analyst</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>5-6 hours</td>
      <td>Unhealthy</td>
      <td>BBA</td>
      <td>Yes</td>
      <td>9.0</td>
      <td>4.0</td>
      <td>Yes</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
features = ['Gender', 'Age', 'Working Professional or Student', 'Pressure',
       'Satisfaction',
       'Have you ever had suicidal thoughts ?', 'Work/Study Hours',
       'Financial Stress', 'Family History of Mental Illness']
removed_features = ["City",'Sleep Duration','Dietary Habits']

contains_na = data.columns[data.isna().any()].tolist()
for column in contains_na:
    nan_percent = (data[column].isna().sum()/len(data.index))*100
    print(f"{column} - {nan_percent.round(5)} % Missing data")
```

    Profession - 26.03412 % Missing data
    Academic Pressure - 80.17271 % Missing data
    Work Pressure - 19.84222 % Missing data
    CGPA - 80.172 % Missing data
    Study Satisfaction - 80.17271 % Missing data
    Job Satisfaction - 19.83653 % Missing data
    Dietary Habits - 0.00284 % Missing data
    Degree - 0.00142 % Missing data
    Financial Stress - 0.00284 % Missing data



```python
content_list = {"Pressure":[],"Satisfaction":[]}
combine_dict = {"Pressure":["Work Pressure","Academic Pressure"],"Satisfaction":["Job Satisfaction","Study Satisfaction"]}
for index,row in data.iterrows():
    for case in combine_dict.keys():
        if not np.isnan(row[combine_dict[case][0]]):
            content_list[case].append(row[combine_dict[case][0]])
        elif not np.isnan(row[combine_dict[case][1]]):
            content_list[case].append(row[combine_dict[case][1]])
        else:
            content_list[case].append(np.nan)
data.insert(loc=6,column="Pressure",value=content_list["Pressure"])
data.insert(loc=9,column="Satisfaction",value=content_list["Satisfaction"])
# data = data.drop(["Work Pressure","Academic Pressure","Job Satisfaction","Study Satisfaction","CGPA","Profession","Degree","Name","id"],axis=1)
# data.head()


```


```python
X = data[features]
y = data["Depression"]
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2,random_state=0)
```


```python
s = (X_train.dtypes == 'object')
categoric_features = list(s[s].index)
print(categoric_features)

ordinal_encoder = OrdinalEncoder()
X_train[categoric_features] = ordinal_encoder.fit_transform(X_train[categoric_features])
X_valid[categoric_features] = ordinal_encoder.transform(X_valid[categoric_features])
```

    ['Gender', 'Working Professional or Student', 'Have you ever had suicidal thoughts ?', 'Family History of Mental Illness']



```python
simple_imputer = SimpleImputer()
contains_na = data.columns[data.isna().any()].tolist()
X_train_imputed = pd.DataFrame(simple_imputer.fit_transform(X_train))
X_valid_imputed = pd.DataFrame(simple_imputer.transform(X_valid))

# Imputation removed column names; put them back
X_train_imputed.columns = X_train.columns
X_valid_imputed.columns = X_valid.columns
X_train.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Gender</th>
      <th>Age</th>
      <th>Working Professional or Student</th>
      <th>Pressure</th>
      <th>Satisfaction</th>
      <th>Have you ever had suicidal thoughts ?</th>
      <th>Work/Study Hours</th>
      <th>Financial Stress</th>
      <th>Family History of Mental Illness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>125323</th>
      <td>0.0</td>
      <td>29.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>8.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>118204</th>
      <td>0.0</td>
      <td>37.0</td>
      <td>1.0</td>
      <td>5.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>371</th>
      <td>1.0</td>
      <td>53.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>12.0</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>132975</th>
      <td>0.0</td>
      <td>41.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>5.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>3.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>36674</th>
      <td>1.0</td>
      <td>44.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>0.0</td>
      <td>10.0</td>
      <td>3.0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
scores = []
estimator_numbers = []
for n_est in range(100,1000,50):
    estimator_numbers.append(n_est)
    model = RandomForestClassifier(n_estimators=n_est)
    model.fit(X_train_imputed,y_train)
    y_pred = model.predict(X_valid_imputed)
    scores.append(accuracy_score(y_valid,y_pred))

plt.plot(estimator_numbers,scores)
plt.xlabel("Estimators")
plt.ylabel("Accuracy Score")
plt.show()
```


![Random forest grid search](images/project_2/grid_search_forest.png)


