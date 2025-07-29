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
