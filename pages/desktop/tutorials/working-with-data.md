---
title: Working with Network Canvas data in R
summary: "
  This tutorial will show you how to work with Network Canvas data in the R statistics environment."
prerequisites: "
  In order to follow along with this tutorial you should:\n

- Have an understanding of the R environment.\n
- Have a working installation of R studio, or similar, in order to enter commands.\n
  "
completion_time: 30 mins
---

This tutorial provides basic examples of import and analysis in R using
data from the [Network Canvas](http://networkcanvas.com) software. The
example will use simulated data from the following network canvas
[protocol
file](https://github.com/complexdatacollective/working-with-data/raw/main/IJE_RADAR_Protocol.netcanvas)
which can be opened in the Network Canvas Interviewer or Architect apps.
The data used in this tutorial can also be found
[here](https://github.com/complexdatacollective/working-with-data/raw/main/networkCanvasExport.zip).

Find the github repository for this tutorial here: <https://github.com/complexdatacollective/working-with-data>

### Export data from Network Canvas

The first step in exporting data from Network Canvas is to navigate to
the Manage and Export Session data in the Interviewer app.

![Manage and Export Session](assets/img/working-with-data/NC_DataExport0.png)

Next, you’ll indicate which sessions you want to export by selecting the
appropriate cards and clicking “Export Selected To File.”

![Select Network Canvas Sessions for Export](assets/img/working-with-data/NC_DataExport1.png)

Next, we’ll confirm export options. We will focus on the CSV export in
this tutorial. I also leave the “Merge Sessions” option unselected
because I prefer to aggregate session data manually in R, as I will
demonstrate below.

![Confirm Network Canvas Export Options](assets/img/working-with-data/NC_DataExport2.png)

Finally, after a short wait, we simply select where we would like the
zip file containing all our data to be saved on our computer. We will
need to unzip the file before starting our data analysis described below

![Select file location](assets/img/working-with-data/NC_DataExport3.png)

### Import and clean the data

Next we want to load the data into R. We use the _egor_ to do this,
using examples derived from an egor [vignette](https://cran.r-project.org/web/packages/egor/vignettes/using_egor.html).

    # Load egor
    library(egor)
    library(sna)
    library(ggplot2)

    # This assumes the the data was unzipped to the "networkCanvasExport" folder that is located in the same folder as this script
    # If the you have data somewhere else, set that folder path here:
    folderPath <- paste0(getwd(),'/networkCanvasExport/')

    # Read each type of file into list, combine into single data frame
    alterData <- folderPath %>%
      list.files(full.names=TRUE,pattern="attributeList_Person.csv") %>%
      lapply(read.csv) %>%
      bind_rows()

    edgelistData_Close <- folderPath %>%
      list.files(full.names=TRUE,pattern="edgeList_Close.csv") %>%
      lapply(read.csv) %>%
      bind_rows()

    edgelistData_SexTie <- folderPath %>%
      list.files(full.names=TRUE,pattern="edgeList_SexTie.csv") %>%
      lapply(read.csv) %>%
      bind_rows()

    edgelistData_DrugTie <- folderPath %>%
      list.files(full.names=TRUE,pattern="edgeList_DrugTie.csv") %>%
      lapply(read.csv) %>%
      bind_rows()

    egoData <- folderPath %>%
      list.files(full.names=TRUE,pattern="ego.csv") %>%
      lapply(read.csv) %>%
      bind_rows()

Now we can examine if the data looks like it should from the alter file.
As you’ll see, the alter data file contains a unique alter identifier
(i.e., “networkCanvasUUID”) as well as a unique ego identifier (i.e.,
“networkCanvasEgoUUID”) which will both be used to define the egor
object.

    head(alterData[,c("nodeID","networkCanvasEgoUUID","networkCanvasUUID","Close","Drugs","Sex","Age")])

    ##   nodeID                 networkCanvasEgoUUID
    ## 1      1 1b915958-a970-4742-9f98-154a5b97c3e9
    ## 2      2 1b915958-a970-4742-9f98-154a5b97c3e9
    ## 3      3 1b915958-a970-4742-9f98-154a5b97c3e9
    ## 4      4 1b915958-a970-4742-9f98-154a5b97c3e9
    ## 5      5 1b915958-a970-4742-9f98-154a5b97c3e9
    ## 6      6 1b915958-a970-4742-9f98-154a5b97c3e9
    ##                      networkCanvasUUID Close Drugs   Sex Age
    ## 1 38eea03a-de1e-4a0b-bd22-9424cd1d9011  true false false  28
    ## 2 21fc603a-34af-42eb-a317-14b9f04d811f  true false  true  91
    ## 3 b22bcff1-e4b9-4aa8-b4cd-0667a1f19ea9 false false  true  90
    ## 4 df31eaa1-bc6d-4213-a25e-61536391a23f false false false  51
    ## 5 c9a1103c-2246-427c-bd7b-f11ea1bf242f  true  true  true  82
    ## 6 c202aa1a-9d24-48b1-82ea-6dbc5e9580f7  true  true false  56

### Recoding categorical variables

Categorical variables from Network Canvas export as one column per
category with a Boolean value for each possible category. However,
researchers frequently want to convert these variables to a single
factor column in R. This helper function can help you achieve that.

    catToFactor <- function(dataframe,variableName) {
        fullVariableName <- paste0(variableName,"_")
        catVariables <- grep(fullVariableName, names(dataframe), value=TRUE)
        # Check if variable exists
        if (identical(catVariables, character(0))){
          stop(paste0("Cannot find variable named -",variableName,"- in the data"))
        # Check if "true" in multiple columns of a single row
        } else if (sum(apply(dataframe[,catVariables], 1, function(x) sum(x %in% "true")>1))>0) {
          stop(paste0("Your variable -",variableName,"  - appears to take multiple values.")) }
        catValues <- sub(paste0('.*',fullVariableName), '', catVariables)
        factorVariable <- c()
        for(i in 1:length(catVariables)){
          factorVariable[dataframe[catVariables[i]]=="true"] <- catValues[i]
        }
        return(factor(factorVariable,levels=catValues))
    }

Using this function, we can recode three variables from the current
protocol into factors

    # List of categorical variables in our protocol to convert into factors
    categoricalVariablesList <- list('Gender','Race','SexOrient')

    # Iterate the list and call our catToFactor function, assigning the result to a new column in our dataframe
    for (variable in categoricalVariablesList) {
      alterData[variable] <- catToFactor(alterData, variable)
    }

### Miscellaneous data cleaning

We’ll want to do a little data cleaning by contact frequency and
counting the number of substances participants reported using, before
loading it into an egor object.

    alterData$ContactFreq[alterData$ContactFreq=="Less_than_weekly"] <- "Less than \n weekly"

    countTrues <- function(vector) {
      length(which(vector=="true"))
    }
    drugNames <-c("MarijuanaUsed","CocaineUsed","HeroinUsed","PainkillersUsed","PoppersUsed")
    egoData$numberDrugs <- apply(egoData[,c(drugNames)],FUN=countTrues,MARGIN=1)

### Create an egor object

After loading and cleaning the data, we still need to make it into an
egor object. Although we have 3 data files with edgelist data, we’ll be
focusing on “Close” social ties for the remainder of this tutorial

    # Load the file into R
    egorNetworkCanvas <- egor(alters = alterData,
               egos = egoData,
               aaties = edgelistData_Close,
               ID.vars = list(
                 ego = "networkCanvasEgoUUID",
                 alter = "networkCanvasUUID",
                 source = "networkCanvasSourceUUID",
                 target = "networkCanvasTargetUUID"))

### Data visualization

Lets start with a simple visualization of one ego network. To do this
we’ll first convert it to a ‘network’ object and use the gplot function
from the sna package. This visualization shows the new node labels and
colors each node by the contact frequency with the participant. We also
layout the figure with the final coordinates from the sociogram stage.

    oneEgoNet <- as_network(egorNetworkCanvas)[[9]]
    oneEgoNet%v%"vertex.names" <- oneEgoNet%v%"name"

    colorScheme <- c( "#CC6677", "#117733", "#AA4499",
                      "#6699CC")

    # A little recoding to get a color for each frequency
    nodeColors <- ifelse(oneEgoNet%v%"ContactFreq"=="Daily",colorScheme[1],
                        ifelse(oneEgoNet%v%"ContactFreq"=="Weekly",colorScheme[2],
                               ifelse(oneEgoNet%v%"ContactFreq"=="Less than \n weekly",colorScheme[3],
                                      colorScheme[4])))

    gplot(oneEgoNet,
           usearrows = FALSE,
           label = oneEgoNet%v%"name",
           displaylabels = TRUE,
           vertex.col=nodeColors,
           edge.col="gray",
           coord = matrix(c(as.numeric(oneEgoNet%v%"Cords_x"),
                            -as.numeric(oneEgoNet%v%"Cords_y")),
                            nrow=length(unique(oneEgoNet%v%"name")),
                            ncol=2))

![''](assets/img/working-with-data/vis1.png){: .img-width-full}

As you can see, this only shows a single egocentric network. However,
the egor package has several functions that facilitate comparison of
networks across ego nets. For example, here is a visualization showing
each ego net with nodes location being dependent on their frequency of
contact with the participant and their status as a drug partner (i.e.,
true/false).

    # Make a visualization displaying both frequency of communication and family member status
    plot(egorNetworkCanvas, venn_var = "Drugs",
         pie_var = "ContactFreq",vertex_label_var="nodeID",
         type = "egogram")

![''](assets/img/working-with-data/vis2.png){: .img-width-full}

## Data analysis

The egor package has numerous functions that help with basic data
analysis of ego networks. For example, the _summary_ function provides
an overview of all ego networks in the egor while the _ego_density_
functions provides the density for each participant’s network.

    summary(egorNetworkCanvas)

    ## 9 Egos/ Ego Networks
    ## 91 Alters
    ## Min. Netsize 3
    ## Average Netsize 10.1111111111111
    ## Max. Netsize 20
    ## Average Density 0.385856531573766
    ## Alter survey design:
    ##   Maximum nominations: Inf

    ego_density(egorNetworkCanvas)

    ## # A tibble: 9 × 2
    ##   .egoID                               density
    ##   <chr>                                  <dbl>
    ## 1 1b915958-a970-4742-9f98-154a5b97c3e9 0.619
    ## 2 102783ac-c48d-4953-97e6-3d84f39fd5d5 0.214
    ## 3 51ce5e11-9aed-4b07-8ccf-1e96f7194ba6 0.0256
    ## 4 ef3aeefe-1af9-4fd4-9e75-318eb329778f 0.105
    ## 5 aae09896-5fc5-4295-8349-58045da6e86a 1
    ## 6 2944b829-ef9d-446e-b592-6fbf57657743 0.00526
    ## 7 79cee692-a513-408d-9701-0efe078b0240 0.218
    ## 8 1c6dd8fd-2b2f-4139-80bc-63c7f34a5ec1 1
    ## 9 0ce518be-d845-4439-8e3a-bd6b86e7cf40 0.286

We can also use a traditional package, such as _sna_, to look at these
networks by applying functions (i.e., lapply) to each of these networks
and aggregating the results. For example, here we first make a simple
histogram of alter degrees across all ego networks.

    networkNetworkCanvas <- as_network(egorNetworkCanvas)

    histData <- networkNetworkCanvas %>%
      lapply(degree,cmode="indegree") %>%
      unlist(recursive = FALSE) %>%
      as.data.frame()

    histData$degree <- as.numeric(histData$".")

    ggplot(histData, aes(x=degree)) +
        geom_histogram(color="black", fill="white",bins=5) +
        theme_classic()

![''](assets/img/working-with-data/vis4.png){: .img-width-full}

Finally, we often want to examine how an ego attribute may be associated
with ego network characteristics. In this example we look at the
association between the number of substances a participant reported
using and the density of their ego network.

    ego_density(egorNetworkCanvas) %>%
      full_join(egorNetworkCanvas$ego,by=".egoID") %>%
      ggplot(aes(x = numberDrugs, y = density)) +
        geom_point(size=5) +
        geom_text(label=egorNetworkCanvas$ego$networkCanvasCaseID, aes(vjust=c(-1.5))) +
        ylim(0,1.05) + theme_classic()

![''](assets/img/working-with-data/vis5.png){: .img-width-full}
