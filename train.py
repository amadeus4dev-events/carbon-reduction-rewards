# Original code: https://github.com/felixjhoffmann/SustainableTourism/
# Paper: Hoffmann et al. (2022), Measuring sustainable tourism with online platform data

# To run this this script perform the following steps:
#     0. Install virtualenv: pip install virtualenv
#     1. Create virtual environment: 
#     1. Activate virtualenv: source env/bin/activate
#     2. Install dependencies: pip install -r requirements.txt
#     3. Run training script: python train.py


import imblearn
import numpy as np
import pandas as pd
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.preprocessing import RobustScaler


training_frame = pd.read_csv("data/HotelsTrainingData.csv", index_col=0)

pipeline= imblearn.pipeline.Pipeline(
    steps=[('t1', RobustScaler()), ('over', SMOTE()),
    ('under', RandomUnderSampler()),
    ('m', QuadraticDiscriminantAnalysis())])

y_train=np.array(training_frame['GreenLeaderBinary'])
X_train=np.array(training_frame.drop(columns=['GreenLeaderBinary']))

pipeline.fit(X_train, y_train)
