
# Exhaustification in Rational Speech Act Models

N.B.: This pipeline makes use of *Jupyter Notebooks* and *R-Notebooks*, the former largely for data preprocessing and the latter largely for analysis and plotting. Both can be converted into base python and R files relativaly easily.

## CogSci_paper.pdf

A copy of Wilcox and Spector (2019) "The Role of Prior Beliefs in the Rational Speech Act Model of Pragmatics: Exhaustivity as a Cast Study" (It's the submission copy, not the final version, which can be found online.)

## Boxes Experiment

This directory contains code for data analysis of the boxes experiment. We conducted two experimetns, one with models ("Sam lifted the chair... do you think she *can* lift the footstool?") and no modals ("Sam lifted the chair... do you think she also lifted the footstool?"). This repository contains only data for the *non-modal* experiments.

• `analysis.Rmd` an R notebook containing analysis and graph-generation code.

• `/data/` contains human results.

• `/images/` is where rendered images are stored (uncomment in `analysis.Rmd` to save them)

• `/modeling/` contains a number of files:

	• `rsa_code.js` is the code used to run the RSA simulations (I pasted it into the webppl online interpreter, but it could be run from the command line)
	
	• `model_results.txt` is the console output from the `rsa_code.js`, the output of the modeling process.
	
	• `data_cleaning.ipynb` is a jupyter notebook that reads in the `model_results.txt` output and saves it as a csv. It also takes the human results from the experiment and calculates a MSE between the human and model for both the speaker, listener and speaker + listener levels.
	
	• `fit_results_nonmodal.csv` are the saved final outputs ready for analysis.

## Restaurant Experiment

Contains code for analysis of the restuaurant experiment, investigating the relationship between liklihood of exhaustification ("A" --> A & B) against priors on world states (A vs. A &B).

• `analysis.Rmd` an R notebook containing analysis and graph-generation code.

• `/data/` contains the results from the human experiments.

• `images/` is where rendered images are stored (uncomment in `analysis.Rmd` to save them)

• `/modeling/` a directory for code used to run RSA simulations

	• `rsa_code.js` is the code used to run the RSA simulations (paste it into the webppl web interface)
	
	• `model_results.txt` is the output from the RSA code (I just copied and pasted the console output into a text file)
	
	• `model_results.csv` are these same results but in .csv format
	
	• `model_fit.ipynb` is a jupyter notebook. It reads in the textfile model results and saves them as a .csv. In addition, it takes the human results (just hand-coded into the script) and finds the MSE between the human and model for each of the different price points. (N.B. it does not actually save the dataframe with the MSEs. Rather, I just inspect it inside the jupyter notebook.)

