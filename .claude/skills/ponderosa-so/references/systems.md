# Systems & iVUE navigation

## iVUE Service (NISC)

**Nav tree:** iVUE Service › Customer Management › Administration › Location › Service Orders › Reports/Processes › Facility Management › Trouble Management

## Service Order screen

- **Search:** Search Type: Service Order → enter SO# → Search
- **Request box:** Left side — what Customer Service wrote (the incoming order)
- **Response box:** Right side — where GIS writes the facility assignment response

**SO tabs:** `SO`, `Workflow`, `Agmt`, `General`, `Interfaces`, `Toll`, `Dir`, `Local`, `Serv Addr`, `911`, `Tax`, `Equip`, `Deposit`, `P&S`

### Office info fields

| Field | Meaning |
|-------|---------|
| source | Telephone/Walk-in/etc |
| requested_by | Customer name |
| taken_by | CSR who took the order |
| contact_info | Contact method dropdown |
| contact_number | Phone number (this may be the CBR#) |
| start_date | When order was created |
| complete_by_date | DUE DATE — deadline for entire workflow |
| complete_by_time | AM/PM appointment window |
| entry_date | System entry date |

### Workflow tasks

- C.DIRVAL - REVIEW DIRECTORY SUMMARY
- C.CALLBLK - VERIFY CALLBACK
- C.P&S - ADD CHARGES & CREDITS
- N.NOC - NETWORK OPERATIONS
- I.INTERNET - INTERNET DEPARTMENT
- C.MODEM - ADD MODEM
- E.FACS - FACILITIES (GIS team task)
- P.PROG - PROGRAMMING
- P.VALCONN - VALIDATE CONNECT DATE
- P.SCHEDULE - SCHEDULE/DISPATCH
- P.COMPLETE - ENTER COMPLETED BY DATE
- C.PRORATE - ENTER PRORATE DATE
- CLOSE_SO - CLOSE SO
- 911_EXT - 911 EXT
- C.DIR ASST - ADD DA ALLOWANCE

> Other systems (LinePacks, Cable Book, Taqua/switch, FACS) are referenced throughout
> the field-source map in `note-format.md`. Detailed nav for those is **PENDING** in the KB.