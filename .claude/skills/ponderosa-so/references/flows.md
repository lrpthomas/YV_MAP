# Flows & corpus templates

Six consolidated E.FACS flows. Action codes branch *inside* each flow. Counts are corpus
occurrences (13,159 SOs). Templates are the real seed templates per corpus workflow — use
them as the skeleton, then drop any line that is N/A for the specific order (omit rule).

## DISCONNECT  — 3413 SOs

### DISCONNECT_ONLY  (1281)
```
{date} -DISC DSL- {facs_status}
{port1}
{port2}
-{tech}
```

### VACA_DISCONNECT  (1124)
```
{date} -VACA DISC- {facs_status}
{port}
-{tech}
```

### NPD  (440)
```
{date} -NPD- {facs_status}
{port}
-{tech}
```

### BILLING_ONLY  (439)
```
{date} -DISC TEL (CBOL) & Billing Correction- {facs_status}
{phone_out} OUT
{port1}
{port2}
-{tech}
```

### EDGE_DISCONNECT  (76)
```
{date} -DISC EDGE- {facs_status}
-{tech}
```

### NPD_DISCONNECT  (53)
```
{date} – Non Paid Suspend - {facs_status}
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```

## CONNECT_RECONNECT  — 6345 SOs

### GEN_DISCONNECT_QDS_BILLING  (1783)
```
{date} -DISC TEL (CBOL), QDS CONN, & Billing Correction- {facs_status}
{phone_out} OUT
{phone_qds} QDS IN
{port}
-{tech}
```

### DISC_QDS_RECON  (1672)
```
{date} -DISC & QDS CONN- {facs_status}
{phone_out} ({account_out}) OUT
{phone_qds} QDS IN
{port}
-{tech}
```

### VACA_RECONNECT  (1285)
```
{date} -VACA RECON- {facs_status}
{port}
-{tech}
```

### RECONNECT_ONLY  (1243)
```
{date} -QDS CONN- {facs_status}
{phone_qds} QDS IN
{port1}
{port2}
-{tech}
```

### SERVICE_POINT_CORRECTION  (265)
```
{date} -Correcting Service points- {facs_status}
```

### DISC_QDS_CONN  (75)
```
{date} – {facs_status}
{phone_out} OUT
{phone_qds} QDS IN
{port}
-{tech}
```

### CONNECT_ONLY  (22)
```
{date} CONNECT SERVICE
*TEL: {tel_port}
{tel_location}
*DSL: {dsl_port}
{dsl_location}
-{tech}-
```

## UPGRADE  — 2160 SOs

### UPGRADE_BONDED  (510)
```
{date} -INT Upgrade to 100/20 BND- {facs_status}
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```

### UPGRADE_ADSL  (457)
```
{date} -INT Upgrade to 25/3 ADSL BND- {facs_status}
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```

### UPGRADE_GENERIC  (412)
```
{date} -INT Upgrade to 25/3 SNGL- {facs_status}
{port}
-{tech}
```

### GENERAL  (358)
```
{date} -Per HAN, need DSL only BND ports, POTS Stays the same- {facs_status}
{port1}
{port2}
{port3}
{port4}
{port5}
{port6}
{port7}
{port8}
{port9}
{port10}
{port11}
{port12}
{port13}
{port14}
{port15}
{port16}
-{tech}
```

### UPGRADE_VDSL  (254)
```
{date} -INT Upgrade to 25/3 SNGL VDSL- {facs_status}
{port}
-{tech}
```

### BAD_PORT_UPDATE  (133)
```
{date} -Per Han, need new ports- {facs_status}
{phone_out} ({account_out}) OUT
*TEL
{tel_port1}
{tel_port2}
{tel_location1}
{tel_location2}
*DSL
{dsl_port1}
{dsl_port2}
{dsl_location1}
{dsl_location2}
-{tech}
```

### DOWNGRADE  (36)
```
{date} -INT Downgrade to 25/3- {facs_status}
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```

## MOVE  — 315 SOs

### MOVE  (207)
```
{date} -MOVE- {facs_status}
{phone_out} OUT
{phone_in} IN
{port1}
{port2}
-{tech}
```

### MOVE_QDS  (108)
```
{date} - Move DSL from 3390 to 2801 - No FACS Changed
{phone_out} ({account_out}) OUT
{phone_qds} QDS IN
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port1}
{dsl_port2}
{dsl_location1}
{dsl_location2}
-{tech}
```

## FIBER_FTTH  — 916 SOs

### FTTH_OTHER  (441)
```
{date} -CONN FTTH 1G/1G (CBOL)- {facs_status}
{port}
-{tech}
```

### UPGRADE_FTTH  (245)
```
{date} -INT Upgrade to 100/100 FTTH- {facs_status}
{phone_out} ({account_out}) OUT
{port1}
{port2}
-{tech}
```

### EDGE_UPGRADE  (130)
```
{date} - EDGE INT Upgrade to 1G/1G - {facs_status}
-{tech}
```

### EDGE_OTHER  (93)
```
{date} -CONN EDGE 100/100- {facs_status}
-{tech}
```

### FTTH_CONNECT  (4)
```
{date} - FTTH 1G/1G - {facs_status}
{phone_in} IN
-{tech}
```

### EDGE_CONNECT  (2)
```
{date} CONNECT EDGE SERVICE
{edge_id} FTTH
FSAN: {fsan}
-{tech}-
```

### PATH_TRACE_UPDATE  (1)
```
{date} - QDS DISC & CONN FTTH 100/100
{phone_qds} QDS IN
{phone_in} IN
{port1}
{port2}
-{tech}
```

## CROSS_CONNECT  — 10 SOs

### CROSS_CONNECT  (8)
```
{date} - QDS DISC & CONN 18/3, moved & added pair - XCONN - {facs_status}
{phone_qds} QDS IN
{phone_in} ({account_in}) IN
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```

### UPGRADE_XCONN  (2)
```
{date} - INT Upgrade to 25/3, Moved, added pair, XCONN- {facs_status}
{phone_out} ({account_out}) OUT
{phone_qds} QDS IN
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}
{dsl_location}
-{tech}
```
