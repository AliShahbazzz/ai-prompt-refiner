export const DUMMY_PURPOSE = `Convert unstructured WhatsApp conversations 
    containing dispatch and delivery updates into accurate, 
    complete, and traceable structured dispatch records 
    suitable for a spreadsheet. The output must 
    capture relevant vehicle details, sender and driver 
    information, dispatch type, shipment details, quantities, 
    destinations, delivery dates, billing details, 
    delays, blockers, dependencies, and other relevant dispatch status 
    without introducing information not supported by the messages.`;

export const DUMMY_PROMPT = `You are a data extraction assistant.

Read each WhatsApp message and extract relevant order/contract information into the provided spreadsheet columns.

Columns:
- Contract/Order Date
- Supplier
- Commission Agent
- Buyer
- Buyer Location
- Buyer Mobile
- Total Quantity
- Product
- Brand
- Quantity
- Rate
- Packing
- Other Product Lines
- CD
- Payment Terms
- Special Terms
- Source Message
- Status

Instructions:
1. Extract information only from the WhatsApp message. Do not invent or assume values.
2. Map information to the most appropriate column.
3. A message may contain multiple products. Put the primary product in Product and the remaining products in Other Product Lines.
4. Preserve quantities, rates, units, percentages, dates, phone numbers, and company/person names accurately.
5. If a value is not present in the message, leave the cell blank.
6. If the message contains an order confirmation, contract, invoice, loading instruction, or dispatch update, extract all relevant details.
7. Use Status such as New, Confirmed, Dispatched, or Completed only when supported by the message.
8. Keep Source Message as the original WhatsApp message.
9. Do not modify or summarize the original message in Source Message.
10. Return the extracted values in the exact spreadsheet column structure provided.`;

export const DUMMY_DATASET = `[
  {
    "id": "case-001",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Laying of 700mm dia DI Pipe - nil",
        "status": "Planned",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-002",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Testing of 700 mm dia DI Pipe - nil",
        "status": "Planned",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-003",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "",
        "work_summary": "Intake well Approach Bridge Beam deshuttering and slab shuttering work",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-004",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "Substation",
        "work_summary": "Brick Work and Plastering",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-005",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "OHSR - no work",
        "status": "Not Started",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-006",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "FILTER HOUSE",
        "work_summary": "And Recycling Tank connecting pipe line excavation work",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-007",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "BOOSTER HOUSE",
        "work_summary": "Floor Slab Concrete",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-008",
    "input": "##Plan 05 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge Beam Deshuttering and slab shuttering work \nSubstation Brick Work and Plastering \n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - And Recycling Tank connecting pipe line excavation work \n\n\nBOOSTER HOUSE-  Floor Slab Concrete \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-05 4:55:55",
        "project_name": "Alakkode I WTP",
        "report_type": "Plan",
        "report_date": "05 August 2026",
        "department": "",
        "work_summary": "Billing RA Bill 8 preparation - bill entry by department",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-009",
    "input": "##Plan for 5th Aug 2026\n\nKothur Factory : To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes for Keshavapuram Project.\n\nPatancheru Factory : To follow-up for quotation of calibration charges for Lab Equipments.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-05 5:04:04",
        "project_name": "Keshavapuram Project",
        "report_type": "Plan",
        "report_date": "5th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-010",
    "input": "##Plan for 5th Aug 2026\n\nKothur Factory : To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes for Keshavapuram Project.\n\nPatancheru Factory : To follow-up for quotation of calibration charges for Lab Equipments.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-05 5:04:04",
        "project_name": "Patancheru Factory",
        "report_type": "Plan",
        "report_date": "5th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up for quotation of calibration charges for Lab Equipments",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-011",
    "input": "##Action on 4th Aug 2026.\n\n1.Pamidi Factory - :   \n    Indent received for Bulker cement. Quotations have been requested from vendors and are awaited.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-05 5:12:54",
        "project_name": "Pamidi Factory",
        "report_type": "Actual",
        "report_date": "4th Aug 2026",
        "department": "Purchase",
        "work_summary": "Indent received for Bulker cement. Quotations have been requested from vendors",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-012",
    "input": "##Plan for 5th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - Indent No - 54: Preparing PO for DI Specials\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n     - IR Sheet & Nut & Bolts - Quotation follow-up\n\n    - ESR & WTP Watco DI Pipes, MS Pipe - Quotation follow-up (Tender due date: 10.08.2026)",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-05 5:14:21",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Plan",
        "report_date": "5th August 2026",
        "department": "Purchase",
        "work_summary": "Preparing PO for DI Specials",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-013",
    "input": "##Plan for 5th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - Indent No - 54: Preparing PO for DI Specials\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n     - IR Sheet & Nut & Bolts - Quotation follow-up\n\n    - ESR & WTP Watco DI Pipes, MS Pipe - Quotation follow-up (Tender due date: 10.08.2026)",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-05 5:14:21",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "5th August 2026",
        "department": "Purchase",
        "work_summary": "IR Sheet & Nut & Bolts - Quotation follow-up",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-014",
    "input": "##Plan for 5th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - Indent No - 54: Preparing PO for DI Specials\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n     - IR Sheet & Nut & Bolts - Quotation follow-up\n\n    - ESR & WTP Watco DI Pipes, MS Pipe - Quotation follow-up (Tender due date: 10.08.2026)",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-05 5:14:21",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "5th August 2026",
        "department": "Purchase",
        "work_summary": "ESR & WTP Watco DI Pipes, MS Pipe - Quotation follow-up",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-015",
    "input": "##Plan on 5th Aug 2026.\n   Keshavapuram site :\n•\tIndent No. 42 : Quotations have been received from the vendors for DI Gate Valves. The Purchase order(PO) is under finalisation.\n ⁠  \nProject Ramagundam*  \nindent no - 01\nFHTC Material comparison completed. Awaiting approval from MD Sir to prepare Purchase Order.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-05 5:17:17",
        "project_name": "Keshavapuram site",
        "report_type": "Plan",
        "report_date": "5th Aug 2026",
        "department": "Purchase",
        "work_summary": "Quotations have been received for DI Gate Valves. Purchase order is under finalisation",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-016",
    "input": "##Plan on 5th Aug 2026.\n   Keshavapuram site :\n•\tIndent No. 42 : Quotations have been received from the vendors for DI Gate Valves. The Purchase order(PO) is under finalisation.\n ⁠  \nProject Ramagundam*  \nindent no - 01\nFHTC Material comparison completed. Awaiting approval from MD Sir to prepare Purchase Order.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-05 5:17:17",
        "project_name": "Project Ramagundam",
        "report_type": "Plan",
        "report_date": "5th Aug 2026",
        "department": "Purchase",
        "work_summary": "FHTC Material comparison completed. Awaiting approval from MD Sir to prepare Purchase Order",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-017",
    "input": "##Action for 6th August 2026:\n\n- *JJM Thrikkalangode Project*:\n\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received.\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, Quotation received (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation follow-up.not yet received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-06 10:43:08",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Plan",
        "report_date": "6th August 2026",
        "department": "Purchase",
        "work_summary": "DI Pipes awaiting inspection call letter from vendor",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-018",
    "input": "##Action for 6th August 2026:\n\n- *JJM Thrikkalangode Project*:\n\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received.\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, Quotation received (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation follow-up.not yet received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-06 10:43:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "6th August 2026",
        "department": "Purchase",
        "work_summary": "IR Sheet & Nut & Bolts quotations compared, waiting for vendor finalisation",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-019",
    "input": "##Action for 6th August 2026:\n\n- *JJM Thrikkalangode Project*:\n\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received.\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, Quotation received (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation follow-up.not yet received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-06 10:43:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "6th August 2026",
        "department": "Purchase",
        "work_summary": "DI Pipes awaiting inspection call letter from vendor",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-020",
    "input": "##Action for 6th August 2026:\n\n- *JJM Thrikkalangode Project*:\n\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received.\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, Quotation received (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation follow-up.not yet received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-06 10:43:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "6th August 2026",
        "department": "Purchase",
        "work_summary": "ESR & WTP Watco DI Pipes quotation received",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-021",
    "input": "##Action for 6th August 2026:\n\n- *JJM Thrikkalangode Project*:\n\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received.\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, Quotation received (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation follow-up.not yet received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-06 10:43:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "6th August 2026",
        "department": "Purchase",
        "work_summary": "Raipur, Odisha DI Pipe (1200 mm dia) quotation follow-up not yet received",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-022",
    "input": "*Action on 06th Aug 2026:*\n\n1. *Keshavapuram Site*  \n   *Indent No. 42*: DI Gate Valves  \n   Status: PO released to AND Valves.  \n   Vendor will dispatch the material on Saturday.\n\n2. *Project Ramagundam*  \n   *Indent No. 01*: FHTC Material  \n   Status: Material comparison completed. Approval received from MD Sir.  \n   Action: Purchase Order released to Hemanth Enterprise.  \n   Vendor will send the inspection call on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-06 12:03:00",
        "project_name": "Keshavapuram Site",
        "report_type": "Actual",
        "report_date": "06th Aug 2026",
        "department": "Purchase",
        "work_summary": "DI Gate Valves PO released to AND Valves",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-023",
    "input": "*Action on 06th Aug 2026:*\n\n1. *Keshavapuram Site*  \n   *Indent No. 42*: DI Gate Valves  \n   Status: PO released to AND Valves.  \n   Vendor will dispatch the material on Saturday.\n\n2. *Project Ramagundam*  \n   *Indent No. 01*: FHTC Material  \n   Status: Material comparison completed. Approval received from MD Sir.  \n   Action: Purchase Order released to Hemanth Enterprise.  \n   Vendor will send the inspection call on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-06 12:03:00",
        "project_name": "Project Ramagundam",
        "report_type": "Actual",
        "report_date": "06th Aug 2026",
        "department": "Purchase",
        "work_summary": "FHTC Material material comparison completed; Purchase Order released to Hemanth Enterprise",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-024",
    "input": "*Action on 06th Aug 2026- : \n\n1.Pamidi Factory - : 2 loads of Bulker cement in transit.it will reach by tomorrow morning at factory.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-06 12:14:52",
        "project_name": "Pamidi Factory",
        "report_type": "Actual",
        "report_date": "06th Aug 2026",
        "department": "Purchase",
        "work_summary": "2 loads of Bulker cement in transit",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-025",
    "input": "##Action for 6th Aug 2026\n\nKothur Factory : To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes for Keshavapuram Project - Material received. \n\nPatancheru Factory : To follow-up for quotation of calibration charges for Lab Equipments - will receive quotation tomorrow.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-06 13:15:41",
        "project_name": "Kothur Factory",
        "report_type": "Plan",
        "report_date": "6th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-026",
    "input": "##Action for 6th Aug 2026\n\nKothur Factory : To follow-up with HST Steels for dispatch of MS Plates for fabrication of MS Pipes for Keshavapuram Project - Material received. \n\nPatancheru Factory : To follow-up for quotation of calibration charges for Lab Equipments - will receive quotation tomorrow.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-06 13:15:41",
        "project_name": "Patancheru Factory",
        "report_type": "Plan",
        "report_date": "6th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up for quotation of calibration charges for Lab Equipments",
        "status": "Partially Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-027",
    "input": "##Plan for 7th Aug 2026\n\nPatancheru Factory : Quotation received for calibration of Lab Equipments. To follow-up for calibration of lab equipments.  \n\nRamnad Project – To follow-up for quotation of MS Plates & Flanges.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-07 6:22:02",
        "project_name": "Patancheru Factory",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "Quotation received for calibration of Lab Equipments",
        "status": "Completed",
        "_sender_phone": "919246185508",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-028",
    "input": "##Plan for 7th Aug 2026\n\nPatancheru Factory : Quotation received for calibration of Lab Equipments. To follow-up for calibration of lab equipments.  \n\nRamnad Project – To follow-up for quotation of MS Plates & Flanges.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-07 6:22:02",
        "project_name": "Patancheru Factory",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up for calibration of lab equipments",
        "status": "Planned",
        "_sender_phone": "919246185508",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-029",
    "input": "##Plan for 7th Aug 2026\n\nPatancheru Factory : Quotation received for calibration of Lab Equipments. To follow-up for calibration of lab equipments.  \n\nRamnad Project – To follow-up for quotation of MS Plates & Flanges.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Syed Ismail",
        "phone_number": "919246185508",
        "timestamp": "2026-08-07 6:22:02",
        "project_name": "Ramnad Project",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "To follow-up for quotation of MS Plates & Flanges",
        "status": "Planned",
        "_sender_phone": "919246185508",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-030",
    "input": "##Plan for 7th Aug 2026. \n*1. Raipur Labhandi & Fundhar*\nWe have received an email from the vendor with vehicle details; Awaiting dispatch details for DI pipes.\n*2. Pamidi Factory*\nAwaiting dispatch details from the vendor for the conveyor belt.\n*3. Kothur, Chandrapur & Pamidi Factories*\nAwaiting the next dispatch plan from the vendor by EOD.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Poonam",
        "phone_number": "919502968937",
        "timestamp": "2026-08-07 6:22:35",
        "project_name": "Raipur Labhandi & Fundhar",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "We have received an email from the vendor with vehicle details; Awaiting dispatch details for DI pipes",
        "status": "Awaiting",
        "_sender_phone": "919502968937",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-031",
    "input": "##Plan for 7th Aug 2026. \n*1. Raipur Labhandi & Fundhar*\nWe have received an email from the vendor with vehicle details; Awaiting dispatch details for DI pipes.\n*2. Pamidi Factory*\nAwaiting dispatch details from the vendor for the conveyor belt.\n*3. Kothur, Chandrapur & Pamidi Factories*\nAwaiting the next dispatch plan from the vendor by EOD.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Poonam",
        "phone_number": "919502968937",
        "timestamp": "2026-08-07 6:22:35",
        "project_name": "Pamidi Factory",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "Awaiting dispatch details from the vendor for the conveyor belt",
        "status": "Awaiting",
        "_sender_phone": "919502968937",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-032",
    "input": "##Plan for 7th Aug 2026. \n*1. Raipur Labhandi & Fundhar*\nWe have received an email from the vendor with vehicle details; Awaiting dispatch details for DI pipes.\n*2. Pamidi Factory*\nAwaiting dispatch details from the vendor for the conveyor belt.\n*3. Kothur, Chandrapur & Pamidi Factories*\nAwaiting the next dispatch plan from the vendor by EOD.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Poonam",
        "phone_number": "919502968937",
        "timestamp": "2026-08-07 6:22:35",
        "project_name": "Kothur, Chandrapur & Pamidi Factories",
        "report_type": "Plan",
        "report_date": "7th Aug 2026",
        "department": "Purchase",
        "work_summary": "Awaiting the next dispatch plan from the vendor by EOD",
        "status": "Awaiting",
        "_sender_phone": "919502968937",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-033",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Laying of 700mm dia DI Pipe - nil",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-034",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Testing of 700 mm dia DI Pipe - nil",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-035",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "",
        "work_summary": "Intake well No work due to heavy rain",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-036",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "OHSR - no work",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-037",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "FILTER HOUSE - No work due to heavy rain",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-038",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "BOOSTER HOUSE - No work due to heavy rain",
        "status": "Not Started",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-039",
    "input": "##Plan 07 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - No work due to heavy rain\n\n35 MLD WTP:\n\n OHSR - no work\n\nFILTER HOUSE - No work due to heavy rain\n\n\nBOOSTER HOUSE-  No work due to heavy rain\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-07 6:53:22",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "",
        "work_summary": "Billing RA Bill 8 preparation - bill entry by department",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-040",
    "input": "Good Afternoon Team,\n\n*Action for 07th Aug 2026:*\n\n1. *Keshavapuram Site*  \n   *Indent: Raipur FHTC Material*  \n   Status: Department personnel along with SGS visited for inspection today. \n   Remaining inspection will be continued tomorrow.\n\n2. *Project Ramagundam*  \n   *Indent No. 01*: FHTC Material  \n   Status: Material comparison completed. Approval received from MD Sir.  \n   Action: Purchase Order released to M/s Hemanth Enterprise.  \n   Update: Material will be ready by Monday. Vendor will share the inspection call on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-07 12:07:49",
        "project_name": "Keshavapuram Site",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "Department personnel along with SGS visited for inspection today; remaining inspection will be continued tomorrow.",
        "status": "In Progress",
        "_sender_phone": "918309397175",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-041",
    "input": "Good Afternoon Team,\n\n*Action for 07th Aug 2026:*\n\n1. *Keshavapuram Site*  \n   *Indent: Raipur FHTC Material*  \n   Status: Department personnel along with SGS visited for inspection today. \n   Remaining inspection will be continued tomorrow.\n\n2. *Project Ramagundam*  \n   *Indent No. 01*: FHTC Material  \n   Status: Material comparison completed. Approval received from MD Sir.  \n   Action: Purchase Order released to M/s Hemanth Enterprise.  \n   Update: Material will be ready by Monday. Vendor will share the inspection call on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-07 12:07:49",
        "project_name": "Project Ramagundam",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "Material comparison completed; approval received from MD Sir; Purchase Order released to M/s Hemanth Enterprise; material will be ready by Monday; vendor will share the inspection call on Monday.",
        "status": "Completed",
        "_sender_phone": "918309397175",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-042",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "DI Pipes awaiting inspection call letter from vendor.",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-043",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "IR Sheet & Nut & Bolts quotations compared; waiting for vendor finalisation.",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-044",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "CI Manhole Cover & Vent Cowl comparison prepared.",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-045",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "DI Pipes awaiting inspection call letter from vendor.",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-046",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "ESR & WTP Watco DI Pipes, MS Pipe quotation follow-up (tender due date 10.08.2026).",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-047",
    "input": "##Action for 7th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: Quotations compared, waiting for vendor finalisation\n- Indent No - 14\n        - CI Manhole Cover & Vent Cowl, prepared comparison. \n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): Quotation received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-07 13:22:01",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "07 August 2026",
        "department": "Purchase",
        "work_summary": "Raipur, Odisha DI Pipe (1200 mm dia) quotation received.",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-048",
    "input": "##Achieved 8th august 2026\n\n\n  Laying - nil \n\n  Testing- nill\n\n  Ohsr - nil \n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work is on Progress \n\n👉🏻 Fhtc-  3 nos done in ELAVANCHERY Panchayath \n\n👉🏻Trail Run -nil \n\nLeakage Rectification work -  3 nos done in palasena panchayath\n\n👉🏻 Plumbing Main Leakage Rectification @ Alathur 40L 0HSR Road is on Progress",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-08 11:25:59",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Bridge - Thonikakadavu PCB Wall chamber work is on Progress",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-049",
    "input": "##Achieved 8th august 2026\n\n\n  Laying - nil \n\n  Testing- nill\n\n  Ohsr - nil \n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work is on Progress \n\n👉🏻 Fhtc-  3 nos done in ELAVANCHERY Panchayath \n\n👉🏻Trail Run -nil \n\nLeakage Rectification work -  3 nos done in palasena panchayath\n\n👉🏻 Plumbing Main Leakage Rectification @ Alathur 40L 0HSR Road is on Progress",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-08 11:25:59",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Fhtc- 3 nos done in ELAVANCHERY Panchayath",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-050",
    "input": "##Achieved 8th august 2026\n\n\n  Laying - nil \n\n  Testing- nill\n\n  Ohsr - nil \n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work is on Progress \n\n👉🏻 Fhtc-  3 nos done in ELAVANCHERY Panchayath \n\n👉🏻Trail Run -nil \n\nLeakage Rectification work -  3 nos done in palasena panchayath\n\n👉🏻 Plumbing Main Leakage Rectification @ Alathur 40L 0HSR Road is on Progress",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-08 11:25:59",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Leakage Rectification work - 3 nos done in palasena panchayath",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-051",
    "input": "##Achieved 8th august 2026\n\n\n  Laying - nil \n\n  Testing- nill\n\n  Ohsr - nil \n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work is on Progress \n\n👉🏻 Fhtc-  3 nos done in ELAVANCHERY Panchayath \n\n👉🏻Trail Run -nil \n\nLeakage Rectification work -  3 nos done in palasena panchayath\n\n👉🏻 Plumbing Main Leakage Rectification @ Alathur 40L 0HSR Road is on Progress",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-08 11:25:59",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Plumbing Main Leakage Rectification @ Alathur 40L 0HSR Road is on Progress",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-052",
    "input": "##Action for 08th Aug 2026:*\n\n1. *Raipur Project*  \n   *Indent: Raipur FHTC Material*  \n   Status: SGS inspection completed.  \n   Update: Material dispatch will start from Wednesday.\n\n2. *Project JJM Moopainad*  \n   *Indent No. 61*: MS Pipes  \n   Status: Indent received for MS Pipes.  \n   Action: Quotations requested from vendors. Comparison completed.  \n   Update: PO will be finalized on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-08 12:03:02",
        "project_name": "Raipur Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "SGS inspection completed",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-053",
    "input": "##Action for 08th Aug 2026:*\n\n1. *Raipur Project*  \n   *Indent: Raipur FHTC Material*  \n   Status: SGS inspection completed.  \n   Update: Material dispatch will start from Wednesday.\n\n2. *Project JJM Moopainad*  \n   *Indent No. 61*: MS Pipes  \n   Status: Indent received for MS Pipes.  \n   Action: Quotations requested from vendors. Comparison completed.  \n   Update: PO will be finalized on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-08 12:03:02",
        "project_name": "Raipur Project",
        "report_type": "Plan",
        "report_date": "Wednesday",
        "department": "",
        "work_summary": "Material dispatch will start from Wednesday",
        "status": "Planned",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-054",
    "input": "##Action for 08th Aug 2026:*\n\n1. *Raipur Project*  \n   *Indent: Raipur FHTC Material*  \n   Status: SGS inspection completed.  \n   Update: Material dispatch will start from Wednesday.\n\n2. *Project JJM Moopainad*  \n   *Indent No. 61*: MS Pipes  \n   Status: Indent received for MS Pipes.  \n   Action: Quotations requested from vendors. Comparison completed.  \n   Update: PO will be finalized on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-08 12:03:02",
        "project_name": "Project JJM Moopainad",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Indent received for MS Pipes",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-055",
    "input": "##Action for 08th Aug 2026:*\n\n1. *Raipur Project*  \n   *Indent: Raipur FHTC Material*  \n   Status: SGS inspection completed.  \n   Update: Material dispatch will start from Wednesday.\n\n2. *Project JJM Moopainad*  \n   *Indent No. 61*: MS Pipes  \n   Status: Indent received for MS Pipes.  \n   Action: Quotations requested from vendors. Comparison completed.  \n   Update: PO will be finalized on Monday.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "Immu",
        "phone_number": "918309397175",
        "timestamp": "2026-08-08 12:03:02",
        "project_name": "Project JJM Moopainad",
        "report_type": "Plan",
        "report_date": "Monday",
        "department": "",
        "work_summary": "PO will be finalized on Monday",
        "status": "Planned",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-056",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "DI Pipes, awaiting inspection call letter from vendor not yet received",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-057",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "IR Sheet & Nut & Bolts: awaiting PO finalisation",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-058",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-059",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "DI Pipes, awaiting inspection call letter from vendor not yet received",
        "status": "Awaiting",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-060",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "Quotation follow-up (Tender due date: 10.08.2026)",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-061",
    "input": "##Action for 8th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor not yet received. \n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation. \n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor not yet received. \n    - ESR & WTP Watco DI Pipes, MS Pipe: Quotation follow-up (Tender due date: 10.08.2026)\n    - Raipur, Odisha DI Pipe (1200 mm dia): 1 Quotation received, waiting for another quote. Not yet received. \n   - Indent No: 28 \n       - Kothur material dispatch details received.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-08 12:12:08",
        "project_name": "Raipur, Odisha DI Pipe (1200 mm dia)",
        "report_type": "Actual",
        "report_date": "08 August 2026",
        "department": "",
        "work_summary": "1 Quotation received, waiting for another quote",
        "status": "Partially Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-062",
    "input": "##Action for 10th Aug 2026.\n\n1. *Pamidi Factory - :* Waiting for Price approval from MD Sir.\n\n2. *Mantralayam Project site* - : Waiting for Price approval from MD Sir..\n   \n3.  *Dhone PSC Laying site* - : Waiting for Price approval from MD Sir.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-10 12:48:47",
        "project_name": "Pamidi Factory",
        "report_type": "Plan",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "Waiting for Price approval from MD Sir",
        "status": "In Progress",
        "_sender_phone": "918143786968",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-063",
    "input": "##Action for 10th Aug 2026.\n\n1. *Pamidi Factory - :* Waiting for Price approval from MD Sir.\n\n2. *Mantralayam Project site* - : Waiting for Price approval from MD Sir..\n   \n3.  *Dhone PSC Laying site* - : Waiting for Price approval from MD Sir.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-10 12:48:47",
        "project_name": "Mantralayam Project site",
        "report_type": "Plan",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "Waiting for Price approval from MD Sir",
        "status": "In Progress",
        "_sender_phone": "918143786968",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-064",
    "input": "##Action for 10th Aug 2026.\n\n1. *Pamidi Factory - :* Waiting for Price approval from MD Sir.\n\n2. *Mantralayam Project site* - : Waiting for Price approval from MD Sir..\n   \n3.  *Dhone PSC Laying site* - : Waiting for Price approval from MD Sir.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-10 12:48:47",
        "project_name": "Dhone PSC Laying site",
        "report_type": "Plan",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "Waiting for Price approval from MD Sir",
        "status": "In Progress",
        "_sender_phone": "918143786968",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-065",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Laying of 700mm dia DI Pipe - nil",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-066",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Testing of 700 mm dia DI Pipe - nil",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-067",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "Intake well Approach Bridge slab stuttering work completed reinforcement started",
        "status": "Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-068",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "OHSR - no work",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-069",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "Sludge well - excavation marking completed waiting for department approval (not received)",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-070",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "BOOSTER HOUSE",
        "work_summary": "Haunch Shuttering supporting work on progress",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-071",
    "input": "## Achieved 10 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab stuttering work completed reinforcement started \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work on progress \n\n\nBilling:\nRA Bill  8  preparation-bill entry by department in progress",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:44",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "",
        "work_summary": "Billing RA Bill 8 preparation - bill entry by department in progress",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-072",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Laying of 700mm dia DI Pipe - nil",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-073",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "DI Pipeline Testing of 700 mm dia DI Pipe - nil",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-074",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "Intake well Approach Bridge slab reinforcement work",
        "status": "Planned",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-075",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "OHSR - no work",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-076",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "35 MLD WTP",
        "work_summary": "Sludge well - excavation marking completed waiting for department approval (not received)",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-077",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "BOOSTER HOUSE",
        "work_summary": "Haunch Shuttering supporting work",
        "status": "Planned",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-078",
    "input": "##Plan 11 August 2026\n\nDI Pipeline:\nLaying of  700mm dia DI Pipe- nil\n\nTesting of 700 mm dia  DI Pipe-nil\n\n Intake well - Approach Bridge slab reinforcement work \n\n35 MLD WTP:\n\n OHSR - no work\n\nSludge well - excavation marking completed waiting for department approval (not received)\n\n\nBOOSTER HOUSE-  Haunch Shuttering supporting work\n\n\nBilling:\nRA Bill  8  preparation-bill entry by department",
    "expected": {
      "columns": {
        "group_name": "KWA-JJM-Alakkode-I-WTP",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:32:54",
        "project_name": "",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "Billing RA Bill 8 preparation - bill entry by department",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "120363185766405022\\@g.us"
      }
    }
  },
  {
    "id": "case-079",
    "input": "##Achieved 10th august 2026\n\n Laying - nil \n\n\n Ohsr - nil\n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work  in progress \n\n👉🏻Fhtc-Erimayur\n\n👉🏻Trail Run -nil\n\n👉🏻Leakage Rectification work -ERIMAYUR  5 nos done",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:34:23",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "Bridge",
        "work_summary": "Thonikakadavu PCB Wall chamber work in progress",
        "status": "In Progress",
        "_sender_phone": "919048300910",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-080",
    "input": "##Achieved 10th august 2026\n\n Laying - nil \n\n\n Ohsr - nil\n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work  in progress \n\n👉🏻Fhtc-Erimayur\n\n👉🏻Trail Run -nil\n\n👉🏻Leakage Rectification work -ERIMAYUR  5 nos done",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:34:23",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "Fhtc",
        "work_summary": "Erimayur",
        "status": "Planned",
        "_sender_phone": "919048300910",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-081",
    "input": "##Achieved 10th august 2026\n\n Laying - nil \n\n\n Ohsr - nil\n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work  in progress \n\n👉🏻Fhtc-Erimayur\n\n👉🏻Trail Run -nil\n\n👉🏻Leakage Rectification work -ERIMAYUR  5 nos done",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:34:23",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "Trail Run",
        "work_summary": "nil",
        "status": "Not Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-082",
    "input": "##Achieved 10th august 2026\n\n Laying - nil \n\n\n Ohsr - nil\n\n👉🏻Bridge -Thonikakadavu PCB Wall chamber work  in progress \n\n👉🏻Fhtc-Erimayur\n\n👉🏻Trail Run -nil\n\n👉🏻Leakage Rectification work -ERIMAYUR  5 nos done",
    "expected": {
      "columns": {
        "group_name": "KWA - JJM - Elevanchery",
        "sender": "Archana Sudhan",
        "phone_number": "919048300910",
        "timestamp": "2026-08-11 4:34:23",
        "project_name": "",
        "report_type": "Actual",
        "report_date": "10 August 2026",
        "department": "Leakage Rectification work",
        "work_summary": "ERIMAYUR 5 nos done",
        "status": "Completed",
        "_sender_phone": "919048300910",
        "_wa_groupid": "919705547778-1620473057\\@g.us"
      }
    }
  },
  {
    "id": "case-083",
    "input": "##Plan for 11th Aug 2026.\n\n1. *Pamidi Factory - :*  Indent received for 80 MT Bags Cement. Clearance received for one load bag cement only i.e 40 MT. Preparing PO from Ramco cement.\n\n2. *Mantralayam Project site* - : Bag cement Clearance received for internal transfer Pamidi factory to Mantralayam project site.\n   \n    3. *Dhone PSC Laying site* * - :  Bag cement Clearance received for internal transfer Pamidi factory to Dhone project site.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-11 5:56:04",
        "project_name": "Pamidi Factory",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "Purchase",
        "work_summary": "Indent received for 80 MT bags cement; clearance received for one load bag cement only i.e 40 MT; preparing PO from Ramco cement",
        "status": "In Progress",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-084",
    "input": "##Plan for 11th Aug 2026.\n\n1. *Pamidi Factory - :*  Indent received for 80 MT Bags Cement. Clearance received for one load bag cement only i.e 40 MT. Preparing PO from Ramco cement.\n\n2. *Mantralayam Project site* - : Bag cement Clearance received for internal transfer Pamidi factory to Mantralayam project site.\n   \n    3. *Dhone PSC Laying site* * - :  Bag cement Clearance received for internal transfer Pamidi factory to Dhone project site.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-11 5:56:04",
        "project_name": "Mantralayam Project site",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "Purchase",
        "work_summary": "Bag cement clearance received for internal transfer from Pamidi factory to Mantralayam project site",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-085",
    "input": "##Plan for 11th Aug 2026.\n\n1. *Pamidi Factory - :*  Indent received for 80 MT Bags Cement. Clearance received for one load bag cement only i.e 40 MT. Preparing PO from Ramco cement.\n\n2. *Mantralayam Project site* - : Bag cement Clearance received for internal transfer Pamidi factory to Mantralayam project site.\n   \n    3. *Dhone PSC Laying site* * - :  Bag cement Clearance received for internal transfer Pamidi factory to Dhone project site.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "SHAIK ZAKEER",
        "phone_number": "918143786968",
        "timestamp": "2026-08-11 5:56:04",
        "project_name": "Dhone PSC Laying site",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "Purchase",
        "work_summary": "Bag cement clearance received for internal transfer from Pamidi factory to Dhone project site",
        "status": "Completed",
        "_sender_phone": "",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-086",
    "input": "##Plan for 11th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n    - Indent No. 55: DI Specials, Quotation follow-up\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation\n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    -  Kejriwal Casting PDC Cheque Courier details Follow-Up.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-11 6:07:48",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "DI Pipes, awaiting inspection call letter from vendor",
        "status": "Awaiting",
        "_sender_phone": "918367551177",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-087",
    "input": "##Plan for 11th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n    - Indent No. 55: DI Specials, Quotation follow-up\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation\n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    -  Kejriwal Casting PDC Cheque Courier details Follow-Up.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-11 6:07:48",
        "project_name": "JJM Thrikkalangode Project",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "DI Specials, Quotation follow-up",
        "status": "In Progress",
        "_sender_phone": "918367551177",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-088",
    "input": "##Plan for 11th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n    - Indent No. 55: DI Specials, Quotation follow-up\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation\n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    -  Kejriwal Casting PDC Cheque Courier details Follow-Up.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-11 6:07:48",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "IR Sheet & Nut & Bolts: awaiting PO finalisation",
        "status": "Awaiting",
        "_sender_phone": "918367551177",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-089",
    "input": "##Plan for 11th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n    - Indent No. 55: DI Specials, Quotation follow-up\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation\n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    -  Kejriwal Casting PDC Cheque Courier details Follow-Up.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-11 6:07:48",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "CI Manhole Cover & Vent Cowl, Comparison done, waiting for vendor finalisation",
        "status": "In Progress",
        "_sender_phone": "918367551177",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  },
  {
    "id": "case-090",
    "input": "##Plan for 11th August 2026:\n\n- *JJM Thrikkalangode Project*:\n    - PO - 174: DI Pipes, awaiting inspection call letter from vendor\n    - Indent No. 55: DI Specials, Quotation follow-up\n\n- *JJM Thrikkalangode - WTP Project*:\n    - Indent No - 13:\n        - IR Sheet & Nut & Bolts: awaiting PO finalisation\n    - Indent No - 14:\n        - CI Manhole Cover & Vent Cowl: Comparison done, waiting for vendor finalisation\n    - PO - 173: DI Pipes, awaiting inspection call letter from vendor\n    -  Kejriwal Casting PDC Cheque Courier details Follow-Up.",
    "expected": {
      "columns": {
        "group_name": "Purchase HO team",
        "sender": "bharath kumar",
        "phone_number": "918367551177",
        "timestamp": "2026-08-11 6:07:48",
        "project_name": "JJM Thrikkalangode - WTP Project",
        "report_type": "Plan",
        "report_date": "11 August 2026",
        "department": "",
        "work_summary": "DI Pipes, awaiting inspection call letter from vendor",
        "status": "Awaiting",
        "_sender_phone": "918367551177",
        "_wa_groupid": "919010023455-1556082627\\@g.us"
      }
    }
  }
]
`;
