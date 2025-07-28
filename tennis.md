# Tennis Match Predictor

## Introduction

This project aims to predict the outcomes of Women's Tennis Association (WTA) matches using machine learning. By analyzing match data from 2005 to 2025, we build a neural network model to forecast the winner based on various player and match attributes.

---

## Data Loading and Preprocessing

The first step involves importing the necessary libraries and loading the dataset. The data is collected from yearly CSV files, cleaned to handle missing values, and transformed into a suitable format for model training.

### Code Block 1: Imports
```python
import sklearn
import pandas as pd
from random import randint
from copy import deepcopy
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, LabelBinarizer
import json
import numpy as np
data_dir = '/home/luke/fun_code/tennis/tennis_wta/'
