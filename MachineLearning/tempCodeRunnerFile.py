"""# For re-generating model"""
# if sys.argv[1] == "RE":
#   # Model.generateModel(pd.read_csv(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/CSV/SA/statementsWithoutLove.csv'), 'Statements', 'Sentiment')
#   print('MODEL REGENERATED AND SAVED @ ->' + str(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/SA/modelMNB.sav', 'wb'))

# else:
#   """# Feeding saved MNB, SVM and vectorizer to Model"""
#   Model.load_model_vectorizer(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/SA/modelMNB.sav', os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/SA/modelSVM.sav', os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/SA/vectorizer.sav')

#   res = str(Model.predict(sys.argv[1]))
#   res = res.replace("'", '"')

#   print(res)
