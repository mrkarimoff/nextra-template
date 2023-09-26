---
summary:
  This tutorial will introduce you to using Server. It it will demonstrate how to deploy interview protocols to devices
  running Interviewer, how to receive data back from those devices, and then how to export
  this data for further analysis.
prerequisites: You should have read and understood the project overview, and be
  familiar with the concept of protocol files. You should install Server and
  Interviewer on one or more devices and have an interview protocol ready if you would like to follow along with the
  steps in this tutorial.
completion_time: 30 minutes
nav_order: 3
title: Using Server to manage a study
wip: false
---

## Introducing Server

Server is an optional companion program to Interviewer and Architect, which has the following useful features:

- It can deploy interview protocol files to field devices running Interviewer
- It receives data directly from field devices, and provides a central repository for interview data
- Allows you to monitor the data collection process in real-time
- Allows you to export data for further analysis in a variety of formats, and including some basic data merging/processing

### When to use Server

Server is not required in order to run a Network Canvas study, since protocol files created in Architect can be opened directly in Interviewer, and Interviewer can export data directly in both CSV and GraphML format. It may be preferable not to use Server in situations where:

- You are in an enterprise environment, with complex networking or security needs
- Your study data is particularly sensitive, and should not be transferred over a network
- You require collaborative access to your data, or you need your data to live in a shared location that can be accessed by multiple team members

However, if your study has a single designated data manager, entails working with many cases on multiple devices, and you are comfortable with the networking configuration that is required, Server may be a useful component of your workflow.

Server is particularly useful when you have multiple devices in the field that all need to transmit interview data to a single location. Each device running Interviewer can be connected to a single instance of Server, which allows you to manage interview protocol deployment, view cases as they are uploaded, and monitor the progress of your project in real time. From this same instance of Server, you are able to export all of your social network data in a format suitable for analysis in standard network and statistical software packages.

## Installing and running server

Server is a desktop program that is designed to be run by a researcher on a dedicated computer in their lab, university, or workplace.

Despite its name, Server is not a headless or command line application designed to be run on your institution's server hardware, or in a data-center. Instead, it is a GUI application that is intended to be run by end-users on their desktop machine.

### System requirements

Because it is not a true 'server' application, Server has no special system requirements beyond the rest of the applications in the Network Canvas suite. That means you should follow the requirements listed in the [installation guide](../installation-guide.md#system-requirements).

One additional consideration unique to Server is that since it acts as an endpoint for data transfer, its networking should be fast and reliable. This means using wired networking and not WiFi, and adjusting the power management settings of your operating system to make sure that the computer does not 'sleep' when not in use, so that it can still receive data.

### Networking configuration

Using the remote data transfer functionality of Server requires that the device running Server and the device(s) running Interviewer be able to communicate with each other. To enable this communication requires a degree of knowledge about computer networks and associated concepts. This tutorial will not go into detail on these topics, so you may need to either consult with technical exports within your institution, use the offline workflow, or consider a workflow that does not use Server if you do not have experience with them.

If you are familiar with these concepts, the networking requirements of Server are simple:

- Server listens on TCP port **61001** for pairing requests, using an unsecured HTTP service.
- Server listens on TCP port **61002** for secure API requests using the HTTPS protocol, including data upload, protocol listing, and protocol download.
- Server binds to these ports on all interfaces addresses, in both IPv4 and IPv6.
- The automatic Server discovery feature uses multicast DNS (also known as Bonjour, or Zeroconf). Server sends service advertisement packets of this type on UDP port **5353**.

You must configure your firewall and/or routing settings to allow the computer running server to receive traffic on the above ports, on whichever interfaces you want to use. If your devices running Interviewer will not be operating on the same LAN, or you are otherwise in an untrusted network environment, **take extreme care over the decision to open these ports**. See the following section for further information on security practices.

### Securing Server

Since Server will store study data, and provides remote data import functionality (meaning it is 'exposed' to other computers) it is important to understand security best practices around its use.

Some key points to keep in mind are:

- Server's data store is **not encrypted** at rest. We made this decision because it would be trivial for a malicious party with access to the computer running Server to uncover the encryption key and decrypt the data. Instead, we strongly advise you to use both the operating level disk encryption features available to you, and strong physical security/user access controls.
- Server is **not intended to be exposed directly to general internet traffic**. Although every effort has been taken to secure Server, no software is completely impervious to attack. You should not allow Server to face internet traffic directly. If your devices running Interviewer are not on the same LAN as the computer running Server, you should use additional transport security in the form of a VPN.

For more information on these topics, see our articles on [IRB and security best practices](../_reference/irb-best-practices.md) and [configuring your devices prior to starting data collection](../_how-to/configuring-devices.md).

## Using Server

After opening the Server application on your computer, you are greeted by the setup screen.

![The setup screen](assets/img/server-guide/server-welcome.png){: .img-width-full}

The setup screen of Server provides instructions for how to create a workspace, and how to pair with a device running Interviewer to facilitate secure encrypted data transmission. The icons in the top right corner of the screen also provide important details about the network connectivity of the computer running Server. These details can be used to manually pair Server to Interviewer field devices if necessary.

### Server's background process

When you open Server, a 'background' process is also launched, which will remain running even if you close the main window of the app. You can find this background process in the system tray on a computer running Windows, and in the status bar on macOS.

This process runs in the background so that you can continue to receive data without having to have the main GUI window open.

To exit the app completely, including closing this background process, click the status icon in the system tray/status bar and then click "quit".

![Quitting the app from the system tray](assets/uploads/screen-shot-2021-04-29-at-4.55.48-pm.png){:standalone}

### Creating a workspace by importing a protocol

Server is organized around the concept of 'workspaces', where each workspace is based on a protocol file. A workspace contains all the data and functionality associated with that protocol file. Every protocol you import will have a dedicated workspace. This allows you the flexibility have multiple protocols or studies running in parallel.

![Workspaces](assets/uploads/screen-shot-2021-04-29-at-5.03.54-pm.png){: .img-float-left .img-width-20}Your workspaces are shown in the purple column on the left hand side of the app, with a large plus button always visible that can be used to create a new workspace.

To create a new workspace, locate a `.netcanvas` protocol file. For the purposes of this demonstration, we can use the sample protocol file that has been discussed in the tutorials on Interviewer and Architect (which can be downloaded [here](https://github.com/complexdatacollective/Documentation/blob/master/protocols/Sample%20Protocol%20v2.netcanvas)).

To create a workspace from the protocol file either:

1. Drag the file directly into the purple sidebar
2. Use the 'plus' button to open a file dialog and browse to the file
3. Select 'Import Protocol' from the file menu and browse to the file

Once imported, you will see a workspace icon that contains the initials of the protocol name, with a unique background that is generated based on the protocol content. Clicking this icon will switch to that workspace, and show the "overview" tab.

![The overview tab of a newly created workspace](assets/img/server-guide/imported-protocol-server.png){:standalone}

Once you have created a workspace from a protocol, it is not possible to update or replace the protocol. This is to ensure that there can be no confusion regarding protocol versions, which could lead to inaccurate or missing data. Server identifies a protocol based on its name, which means that if you attempt to create a new workspace with a protocol whose name is already used by another workspace, you will receive an error message.

If you need to update a protocol after you have created a workspace for it, you should instead rename the protocol to indicate that it is a different version, and then create a new workspace. If you need to merge the data from the two protocols, you should handle this process manually outside of Server. This ensures that all data cleaning and merging steps are conducted deliberately as directed by you, which in turn leads to greater confidence in the data.

### Navigating a protocol workspace

A workspace is divided, which are visible along the top of the screen:

- **Overview**: This tab displays key summary information about your study and updates in real time as new interview data is uploaded. The 'cards' containing summary charts for your variables can be reordered by dragging them.
- **Manage cases**: A simple list of interview sessions allowing you to individually delete a session.
- **Export data**: Allows you to export data from Server in a format of your choosing, as well as specify export options such as merging.
- **Resolve data**: An advanced feature that allows you to match alters across interviews using a custom python script.
- **Settings**: The settings tab allows you to delete the workspace, as well as customize which charts are visible on the overview tab.

## Pairing Server with interview devices

Getting data from Interviewer into Server requires "[pairing](../_key-concepts/pairing.md)" the two devices. The pairing process works by using an "out of band" code that is generated by Server and used by both Server and Interviewer to generate a unique encryption key. This key is used by both apps in all subsequent security sensitive communication, such as when downloading interview protocols, or uploading data.

To pair a device with Server, make sure you have both Interviewer and Server programs open and running, and you have configured your network as [described above](#networking-configuration).

For testing purposes, and to follow along with this tutorial, you may wish to run Interviewer and Server on the same computer, which will avoid the need to configure networking.
{: .tip-box}

### Using automatic Server discovery

Your device running Interviewer needs to know the IP address of the computer running Server so that can send a pairing request. As a convenience, we implemented a discovery protocol that can enable your devices to find each other automatically. We call this feature "automatic Server discovery".

This feature uses a technology called multicast DNS (also known as Bonjour or Zeroconf), which is also used for Apple's AirPlay feature, and in Google's Chromecast devices. Multicast DNS typically only works when devices are on the same LAN, but is enabled by default in both Server and Interviewer as a 'best case' option.

Click the networking status indicator in the top right of Server to see information about the status of the automatic discovery feature, as well as other useful networking information.
{: .tip-box}

With Interviewer open, scroll down to the 'Server Status' panel at the bottom of the start screen. Interviewer will automatically search for any Servers available on the same network. If Interviewer detects a nearby computer running Server, it will appear as a card on the panel displaying the name of the computer and its IP address.

![Image](assets/img/server-guide/discovery-section.png){: .img-width-full}

To trigger the pairing process, click the card.

### Using manual connection details

If you cannot utilize automatic discovery (either because it fails or is unavailable), you can also enter manual connection details for Server. To do this, follow the same steps as above (scroll to the bottom of the Interviewer start screen, to the "Server Status" section). Click the white button in the bottom right hand corner ("provide manual connection details").

![The manual connection details form](assets/img/key-concepts/pairing/nc-manual-pairing.png){:standalone}

In the manual connection dialog, you must enter in the IP address and port number of the Server with which you wish to pair. The Server IP address and port number can be found by clicking on the Network Status icon on the top right of the main interface in Server.

![Network information panel in Server](assets/img/key-concepts/pairing/server-manual-details.png){:standalone}

Please note that the connection information listed here may not reflect the publicly routable address for Server if you have configured NAT or port forwarding through a gateway.
{: .tip-box}

### The pairing flow

Whether you use automatic discovery or manual connection information to locate Server, the pairing process itself will be the same. Once you have attempted to connect to Server, a pairing request will be sent. When Server receives it, a notification will be shown, which you must respond to.

![The pairing request is shown as a notification in Server](assets/img/key-concepts/pairing/server-acknowledge.png){:standalone}

To accept this request, click the "pair with device". As soon as you accept the pairing request, a new dialog will open in Server with a unique sixteen letter pairing code.

![The pairing code, shown in Server](assets/img/server-guide/key-server.png){:standalone}

At the same time, a new dialog will open in Interviewer with space to enter this code. To complete pairing, enter the code provided by Server into the empty box, then click the green "pair" button.

You can copy and paste the pairing code from within Server. This may make entering it less error-prone.
{: .tip-box}

Once confirmed, the Server status section in Interviewer will update to show the connection status with Server, and a new option to import from Server will appear in the protocols section. Additionally, data export to Server will be enabled.

![The updated Server section, and new protocol import option in Interviewer](assets/img/server-guide/import-protocol-interviewer.png){:standalone}

## Pushing interview data to Server

Once a device running Interviewer is paired with Server, new data export options become available in the "Export & Manage Interview Data" section of the Interviewer start screen.

To securely transfer data to Server from interviewer, select one or more cases from this section, and click "export selected to Server".

When you export selected cases to Server, Interviewer will indicate whether the upload was successful. You can also cross check the data was successfully uploaded to Server by viewing the overview tab for the protocol workspace you are using, which will show the data in real time.

### Manually importing data into Server

As per the [offline workflow](./offline-data-management-workflow.md) it is also possible to import interview data into Server manually.

For this to work, you **must** export your data from Interviewer in the enhanced GraphML format we have implemented. This is because this format contains Network Canvas specific metadata that is needed to ensure the integrity of the data, as well as to encode the ego-level variables from your protocol.

Once you have exported one or more interview sessions in GraphML format, transfer them to the computer running Server. To import them, either:

1. Drag and drop one or more files into the protocol workspace (not the purple sidebar!), or
2. Select "Import Interview Files" from the File menu.

## Exporting data

Interview data can be exported from Server using the "Export Data" tab. The content of this tab is split into steps, which determine the details of the data export.

![The data export tab](assets/img/server-guide/export-data.png){:standalone}

### File type

The first choice you must make during export concerns the file type. Server supports two types of network data files:

- **CSV**. A common format for representing network data. This format is readable as a table (or series of tables) in Excel, LibreOffice, Keynote, and other tabular programs. The CSV version also complies with the `egor` package standard. Selecting this option will output multiple files, including node and edge lists for each type, and an ego attribute list that also includes session metadata:
  - **Ego attribute list**: This file will have one row per ego, with ego-level variables session metadata. The filename will be in the format `caseID_sessionUUID_ego.csv`.
  - **Alter attribute list**: This file will have one row per alter (i.e. per nominated node). All alters have their own unique ID, as well as an automatically incrementing ID that is only consistent on a per-export basis. The filename will be in the format `caseID_sessionUUID_alterType.csv`.
  - **Edge attribute list**: This will have one row per relationship, with columns representing edge attributes. Each row will have a key to link to ego (`networkCanvasEgoUUID`), as well as source and target columns that reference both the UUID and the automatically incrementing export ID. The filename will be in the format `caseID_sessionUUID_edgeType.csv`.
- **GraphML**. An XML based open standard for representing graph data, that is compatible with many social network analysis programs including UCINET, Gephi, NodeXL, Pajek, Visone, and ORA. Server outputs a [slightly modified](../_reference/network-canvas-graphml.md) version of the GraphML format, which also contains ego data and Network Canvas session metadata. The filename will be in the format `caseID_sessionUUID.graphml`.

Which file type you should choose depends largely on the needs of your analysis tools. We recommend exporting data in both formats, and experimenting with the data you receive to ensure that it needs your needs.

### Export options

Next, you may configure a variety of specialized export options that will impact the data you receive in a variety of ways. These options can be left at their default values unless you know that you need to change them.

#### Merge sessions by protocol

The option to "Merge Sessions by Protocol" will produce a consolidated file (or files in the case of CSV) that contains all interviews. Although the file(s) will contain all egos, nodes, and edges across all interviews, the ego networks themselves will not be merged in any way.

If this option is left deselected, the export process will produce separate files for each of the interviews completed.

#### Use screen layout coordinates

Position data from layout variables used on the Sociogram interface in Interviewer is stored on nodes as normalized x/y coordinates, with the origin in the top left of the screen. This allows you to later visualize these layouts on a canvas of arbitrary size, and to compare layouts that were created on screens with different proportions.

As part of the export flow in Server, you can optionally transpose these normalized values to screen space coordinates. When you enable this option, you will be required to specify 'virtual' screen dimensions. New variables will then be created and added to your exported data, based on scaling each layout variable by these dimensions. This will result in pixel value X/Y coordinates.

### CSV specific file options

When exporting CSV data is enabled in step 1, an additional step appears that allows you to specify which files you would like to export.

By default the export does not include an adjacency matrix, since this format will result in an extremely large file with relatively little data. It is included for compatibility reasons, should you need it.

It is **very** easy to create unmanageably large files by combining the "merge sessions by protocol" and "adjacency matrix" export options. A study containing 2000 cases will produce a single 13gb CSV file when using these options together! Ensure that you require both options before enabling them.
{: .tip-box .caution}

### Concluding the export

Once you have selected the options you desire, click "begin export" to start the export process. Depending on the size of your dataset, and the options you select, this process may take several minutes to complete. At the end of the process, you will receive a ZIP archive that you can save to your filesystem that contains your data.

## Resolving data

This tab is used to access an advanced 'entity resolution' feature, which allows you to write a python script that can match alter nodes across interviews, thereby creating a pseudo whole-network from a series of ego networks. The specifics of using this feature are covered in a [dedicated tutorial](./resolving-entities.md).

## Further reading

This concludes our introductory tutorial on using Server. You may now wish to read further on several more advanced topics.

- Learn about how to analyze the data you have exported from Server in the tutorial on [working with Network Canvas data in R](./working-with-data.md).
- Consult the tutorial on the [offline workflow](./offline-data-management-workflow.md) for further information about alternative approaches to managing study data, both with and without using Server.
- Read the advanced tutorial on [resolving entities across interviews](./resolving-entities.md) if you are interested in creating pseudo whole-networks from a collection of ego networks.
