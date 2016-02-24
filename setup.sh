# updates for PEN-3299 lab addendum 


cd ~/PEN-3299/nodejs 

# work around: mark cluster members enabled for scaling 
node scalingCluster.js strongLoopCluster localhost /home/was/wlpn member1
node scalingCluster.js strongLoopCluster localhost /home/was/wlpn member2

# workaround: mark app as started 
node setAppStarted.js localhost /home/was/wlpn member1
node setAppStarted.js localhost /home/was/wlpn member2

# enable configDropins 
mkdir ~/IBM/wlp/usr/servers/controller1/configDropins
mkdir ~/IBM/wlp/usr/servers/controller1/configDropins/overrides 

# provide required config 
cd ~/PEN-3299

# policy for strongLoopCluster 
cp strongLoopCluster.scalingPolicy.xml ~/IBM/wlp/usr/servers/controller1/configDropins/overrides
# enable config tool for controller1 
cp controller.fileAccess.xml ~/IBM/wlp/usr/servers/controller1/configDropins/overrides

