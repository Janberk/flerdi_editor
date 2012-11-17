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
graph_label1 = GraphLabel.create(:role_identifier => "PIP91", :graph_type => "OL", :graph_nr => 0, :v_net_identifier => "noconnect-1-link")

#-----------------------------------------------------------
#vlinks
#-----------------------------------------------------------

#===c1eth0-C2eth0

tmpne = graph_label1.network_elements.create(:identifier => "c1eth0_c2eth0", :ne_type => "/link/generic")
tmpres = tmpne.resources.create(:avp_attribute => "/link/generic/upstream/bandwidth", :value => 100, :value_type => "constant", :is_request => 1)
tmpres = tmpne.resources.create(:avp_attribute => "/link/generic/downstream/bandwidth", :value => 100, :value_type => "constant", :is_request => 1)


#-----------------------------------------------------------
#nodes
#-----------------------------------------------------------

#===c1
c1 = graph_label1.network_elements.create(:identifier => "c1", :alias => "alias1-c1", :ne_type => "/node/host/generic")
c1.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c1.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
