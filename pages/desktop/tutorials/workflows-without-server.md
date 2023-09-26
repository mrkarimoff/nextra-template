---
summary: >-
  This tutorial describes a workflow for using Network Canvas tools without relying on the Server App. [Server is deprecated](https://community.networkcanvas.com/t/changes-to-interviewer-that-make-server-obsolete/104/2) and is no longer recommended, therefore certain adjustments must be made in the application of Network Canvas tools.
prerequisites: >-
  To follow along, you should:

  - Be familiar with Network Canvas and its data collection process.

  - Have access to devices running the Interviewer app.

  - Have the ability to install software or configure your devices, or the support of someone who does (e.g., institutional IT department)

  - Create or obtain the protocol file that you want to deploy using Interviewer. (See "[building a protocol](building-a-protocol)").
completion_time: 30 minutes
nav_order: 3
title: Protocol and Data Workflows without Server
wip: false
---

## Introduction

This guide will walk you through two possible workflows for conducting research using the Network Canvas tools without using the Server app. These approaches cover both scenarios with and without network connectivity, as well as using tablets or laptop/desktop devices.

## Background

As a reminder, when we launched the Network Canvas suite of tools we included a data warehousing/management tool called Server. Server was designed to streamline data collection processes through protocol, deployment, and centralized data management. However, its adoption has been limited due to unforeseen requirements associated with software deployment in institutional settings.

We made the decision to deprecate Server in 2023, and it is no longer recommended for use. However, we recognize that many researchers may still wish to use Network Canvas tools in a way that is similar to the Server workflow. This tutorial describes a workflow for using Network Canvas tools without relying on the Server App.

The Network Canvas team is developing Network Canvas Studio, a cloud-based platform that will resolve many of the complexities associated with managing protocols and exporting data.
{:.tip-box}

## Option 1: Online Workflow

If you are working in a scenario where you have access to a network connection with internet access, you can use the following workflow to deploy protocols and export data.

![Online workflow diagram](assets/img/offline-data/online.png){: .img-width-full}

### Protocol Deployment

The two most convenient ways to deploy protocols are to use a **cloud file sharing service** or a **web hosting service**. These options allow you to share your protocol file with others either by providing them with a link to the file, or by importing it via the cloud file service's app on your device.

#### Using a cloud file sharing service to deploy protocols

The preferred method for deploying protocols is to use a cloud file sharing service. This allows you to share the protocol file with others either by providing them with a link to the file, or by importing it via the cloud file service's app on your device. It has the significant advantage of providing a single location for the protocol file that can be updated as needed, and which can be accessed by multiple people at the same time.

1. Place your `.netcanvas` file on a cloud storage service (e.g., Box, DropBox, Google Drive). This can generally be accomplished by dragging and dropping the file into a dedicated folder on the computer you are using to author the protocol. Alternatively, many providers allow you to upload files via a web interface.
2. (Optionally) generate a shareable link for the protocol file in the cloud service. The precise mechanism by which this is accomplished varies by provider. You can then use this link to import the protocol file on your devices running Interviewer (see "Utilizing URL import to deploy protocols", below).
3. Alternatively, install the cloud service's app on your device, and use it to import the ".netcanvas" file into the Network Canvas Interviewer App using the 'Import from File' button on the start screen. Typically, this is accomplished by browsing to a special location in the file browser that corresponds to the cloud storage provider (e.g., "Dropbox" or "Google Drive"). If your provider is not visible in the file browser, try to copy the protocol file to the storage of your device from within the provider's app.

#### Utilizing URL import to deploy protocols

A second option for protocol import that can work well for cases where the protocol is not likely to change frequently, or where you want to document the setup process in writing, is to use the URL import feature of the Network Canvas Interviewer App. This allows you to import a protocol file directly from a web link (URL).

1. Use a web hosting service that provides file hosting capabilities to host the protocol's ".netcanvas" file (e.g., GitHub Pages, SharePoint, and so on).
2. Once you have a hosting service, upload your `.netcanvas` file.
3. Once the file is uploaded, you need to determine the URL for accessing the "netcanvas" file. The URL will typically follow the format: `https//<your website>.com/path/to/file.netcanvas`.
4. Ensure that the URL is publicly accessible by opening it in a web browser.
5. Once the file is hosted and the URL is accessible, you can share the web link with others. They can then use the link to access and import the protocol file into the Network Canvas Interviewer App using 'Import from URL' button on the start screen.

### Data Export

As with the protocol deployment flow described above, we reccomend using a cloud file sharing service to export data. This allows you to consolidate interview data by directly uploading your data to your cloud provider.

1. Create a dedicated folder on your cloud storage service to store the Network Canvas Interviewer data. Choose a location that is easily accessible and organized. If you are operating within a large team, consider creating individual folders for each person conducting interviews, and consider setting permissions to "write only" (or similar) so that interviewers can only add files to their own folder.
2. Install the cloud service's app on your interview device, and ensure that you are logged in to the app and have access to the folder you created in step 1.
3. Once you have conducted some interviews, navigate to the 'Manage or Export Sessions' card on the start screen and select the files you wish to export. You will be prompted to choose a location to save the export.
   - If you are using a tablet device, you will be prompted to choose an app to handle the export. Choose the cloud service's app. The app will then open and you will be prompted to choose a location to save the export.
   - If you are using a PC or Mac, you will be prompted to choose a location on the device's filesystem to save the export. Navigate to the cloud service's folder that you created in step 1.

#### Alternatives

It is possible to transmit the zip files created by Interviewer through many other mechanisms than those described above. However, these are generally not recommended as a primary workflow as they can be more insecure and error-prone than using a cloud file sharing service, and many not be compatible with the IRB requirements of your research.

However, if you are comfortable with the potential risks, it should be possible to use the same approach as above to "share" your exported data to a number of apps and services, including via email, Slack, SharePoint, and so on.

## Option 2: Offline workflow

If you are working in a scenario where you do not have access to an internet connection, you can use the following workflow to deploy protocols and export data.

![Offline workflow diagram](assets/img/offline-data/offline.png){: .img-width-full}

### Protocol deployment

In an offline setting, the only option for deploying protocols is to use a USB flash drive or other external storage device to transfer the protocol file physically from your computer to the device running the Interviewer.

1. Determine the path to your protocol file (where it is saved on your computer). It typically follows the format: `C:\Folder\Subfolder\file.netcanvas` for Windows or `/Users/Username/Folder/Subfolder/file.netcanvas` for Mac.
2. Open the file browser on your computer and navigate to the location of the protocol file.
3. Insert your USB flash drive or other external storage device into your computer.
4. Copy the protocol file to the external storage device.
5. Eject the external storage device from your computer.
6. Insert the external storage device into the device running the Network Canvas Interviewer App.
7. Open the Network Canvas Interviewer App and navigate to the 'Import from File' button on the start screen.
8. Navigate to the external storage device's folder, and select the protocol file.

Refer to the documentation from your operating system or device manufacturer (or simply test ahead of time) to ensure that the storage device you are using to transfer the protocol file can be read by the device running the Network Canvas Interviewer App _and_ the device runnig Architect.
{:.tip-box}

### Data Export

As above, the only option for exporting data in an offline setting is to use a USB flash drive or other external storage device to transfer the data files from the device running the Network Canvas Interviewer App to a computer.

1. Create a dedicated folder on your external storage device to store the Network Canvas Interviewer data. Choose a location that is easily accessible and organized. If you are operating within a large team, consider creating individual folders for each person conducting interviews.
2. Once you have conducted your interviews, navigate to the 'Manage or Export Sessions' card on the start screen of Interviewer and select the files you wish to export. You will be prompted to choose a location to save the export.
   - If you are using a PC or Mac, you will be prompted to choose a location on the device's filesystem to save the export. Navigate to the external storage device's folder that you created in step 1.
   - If you are using a tablet device, you will be prompted to choose an app to handle the export. The export functionality on tablet devices works using the "share" feature built into both Android and iOS. This means that options for saving exported data are determined by which apps you have installed on your device. You therefore need to install a file management app such as "[Files by Google](https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.files&hl=en_ZA&gl=US&pli=1)". Once installed, choose the file manager app from the share menu. The app will then open and you will be prompted to choose a location to save the export. Navigate to the external storage device's folder that you created in step 1.

## Data Organization and Backup Best Practices

Regardless of which workflow you choose, it is important to consider how you will organize and back up your data. The following are some best practices to consider:

1. Within the local or cloud folder, create subfolders to categorize and organize the Network Canvas Interviewer data based on project, date, or any other relevant criteria.
2. Regularly back up the data by copying or syncing the local folder to an external storage device or a different cloud storage service. Putting the data on the cloud provider is not a backup, as it is still only in one location.
3. Consider implementing a version control system or maintaining backups at different time intervals to ensure data integrity and minimize the risk of data loss.
4. Use the access control features of your cloud storage service to ensure that only authorized individuals have access to the data, and that they only have the level of access required to perform their role.
5. Give clear instructions to your interviewers about how and when they should export data. Consider creating a checklist or other documentation to help them remember the steps. This should include information such as how many/which sessions should be exported together, and which export options should be selected. Remember that the result of the export process is a single zip file, so this information will not be visible to you once the export is complete until the data is extracted.
