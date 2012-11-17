#!/usr/bin/ruby
$LOAD_PATH << "/scripts/common/"
$LOAD_PATH << "/scripts/common/testing/"

require 'rubygems'
require 'i18n'
require 'active_record'
require 'yaml'

$config = YAML.load_file(File.join(File.dirname('/scripts/common/testing/'), 'database.yml'))
ActiveRecord::Base.establish_connection $config[4]

require 'classes'

#Stdout dumps for debugging
text_dump = true
yaml_dump = true



#==================================================================================================================================
#Test VNet (OL0)
#==================================================================================================================================
graph_label1 = GraphLabel.create(:role_identifier => "PIP91", :graph_type => "OL", :graph_nr => 0, :v_net_identifier => "noconnect-4")

#-----------------------------------------------------------
#nodes
#-----------------------------------------------------------

#===c1
c1 = graph_label1.network_elements.create(:identifier => "c1", :alias => "alias1-c1", :ne_type => "/node/host/generic")
c1.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 0)
c1.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 0)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 0)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 0)
#-----------------------------------------------------------

#===c2
c2 = graph_label1.network_elements.create(:identifier => "c2", :alias => "alias1-c2", :ne_type => "/node/switch/cisco")
c2.features.create(:avp_attribute => "/node/switch/cisco/Virtualization/vlan/zone", :value => "domestic", :priority => 1, :is_request => 0)
tmpres = c2.resources.create(:avp_attribute => "/node/switch/cisco/RAM/real/amount", :value => 8000, :value_type => "constant", :is_request => 0)
tmpres = c2.resources.create(:avp_attribute => "/node/switch/cisco/symmetric/bandwidth", :value => "1000000", :value_type => "constant", :is_request => 0)
#-----------------------------------------------------------

#===c3
c3 = graph_label1.network_elements.create(:identifier => "c3", :alias => "alias1-c3", :ne_type => "/node/switch/tunnelbridge")
c3.features.create(:avp_attribute => "/node/switch/tunnelbridge/Virtualization/vlan/zone", :value => "domestic", :priority => 1, :is_request => 0)
tmpres = c3.resources.create(:avp_attribute => "/node/switch/tunnelbridge/RAM/real/amount", :value => 8000, :value_type => "constant", :is_request => 0)
tmpres = c3.resources.create(:avp_attribute => "/node/switch/tunnelbridge/symmetric/bandwidth", :value => "1000000", :value_type => "constant", :is_request => 0)
#-----------------------------------------------------------

#===c4
c4 = graph_label1.network_elements.create(:identifier => "c4", :alias => "alias1-c4", :ne_type => "/node/host/pip")
c4.features.create(:avp_attribute => "/node/host/pip/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 0)
c4.features.create(:avp_attribute => "/node/host/pip/Virtualization/mechanism", :value => "kvm", :priority => 2, :is_request => 0)
c4.features.create(:avp_attribute => "/node/host/pip/Console/type", :value => "text", :priority => 1, :is_request => 0)
tmpres = c4.resources.create(:avp_attribute => "/node/host/pip/RAM/real/amount", :value => 65536, :value_type => "constant", :is_request => 0)
tmpres = c4.resources.create(:avp_attribute => "/node/host/pip/HDD/hd_0/space", :value => "500000000", :value_type => "constant", :is_request => 0)
