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
graph_label1 = GraphLabel.create(:role_identifier => "PIP91", :graph_type => "OL", :graph_nr => 0, :v_net_identifier => "noconnect-50")

#-----------------------------------------------------------
#nodes
#-----------------------------------------------------------

#===C1
c1 = graph_label1.network_elements.create(:identifier => "C1", :alias => "alias1-C1", :ne_type => "/node/host/generic")
c1.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c1.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c1.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c2
c2 = graph_label1.network_elements.create(:identifier => "c2", :alias => "alias1-c2", :ne_type => "/node/host/generic")
c2.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c2.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c2.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c2.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c3
c3 = graph_label1.network_elements.create(:identifier => "c3", :alias => "alias1-c3", :ne_type => "/node/host/generic")
c3.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c3.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c3.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c3.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c4
c4 = graph_label1.network_elements.create(:identifier => "c4", :alias => "alias1-c4", :ne_type => "/node/host/generic")
c4.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c4.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c4.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c4.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c5
c5 = graph_label1.network_elements.create(:identifier => "c5", :alias => "alias1-c5", :ne_type => "/node/host/generic")
c5.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c5.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c5.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c5.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c6
c6 = graph_label1.network_elements.create(:identifier => "c6", :alias => "alias1-c6", :ne_type => "/node/host/generic")
c6.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c6.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c6.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c6.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c7
c7 = graph_label1.network_elements.create(:identifier => "c7", :alias => "alias1-c7", :ne_type => "/node/host/generic")
c7.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c7.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c7.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c7.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c8
c8 = graph_label1.network_elements.create(:identifier => "c8", :alias => "alias1-c8", :ne_type => "/node/host/generic")
c8.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c8.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c8.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c8.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c9
c9 = graph_label1.network_elements.create(:identifier => "c9", :alias => "alias1-c9", :ne_type => "/node/host/generic")
c9.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c9.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c9.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c9.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c10
c10 = graph_label1.network_elements.create(:identifier => "c10", :alias => "alias1-c10", :ne_type => "/node/host/generic")
c10.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c10.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c10.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c10.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c11
c11 = graph_label1.network_elements.create(:identifier => "c11", :alias => "alias1-c11", :ne_type => "/node/host/generic")
c11.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c11.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c11.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c11.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c12
c12 = graph_label1.network_elements.create(:identifier => "c12", :alias => "alias1-c12", :ne_type => "/node/host/generic")
c12.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c12.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c12.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c12.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c13
c13 = graph_label1.network_elements.create(:identifier => "c13", :alias => "alias1-c13", :ne_type => "/node/host/generic")
c13.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c13.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c13.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c13.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c14
c14 = graph_label1.network_elements.create(:identifier => "c14", :alias => "alias1-c14", :ne_type => "/node/host/generic")
c14.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c14.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c14.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c14.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c15
c15 = graph_label1.network_elements.create(:identifier => "c15", :alias => "alias1-c15", :ne_type => "/node/host/generic")
c15.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c15.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c15.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c15.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c16
c16 = graph_label1.network_elements.create(:identifier => "c16", :alias => "alias1-c16", :ne_type => "/node/host/generic")
c16.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c16.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c16.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c16.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c17
c17 = graph_label1.network_elements.create(:identifier => "c17", :alias => "alias1-c17", :ne_type => "/node/host/generic")
c17.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c17.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c17.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c17.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c18
c18 = graph_label1.network_elements.create(:identifier => "c18", :alias => "alias1-c18", :ne_type => "/node/host/generic")
c18.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c18.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c18.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c18.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c19
c19 = graph_label1.network_elements.create(:identifier => "c19", :alias => "alias1-c19", :ne_type => "/node/host/generic")
c19.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c19.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c19.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c19.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c20
c20 = graph_label1.network_elements.create(:identifier => "c20", :alias => "alias1-c20", :ne_type => "/node/host/generic")
c20.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c20.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c20.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c20.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c21
c21 = graph_label1.network_elements.create(:identifier => "c21", :alias => "alias1-c21", :ne_type => "/node/host/generic")
c21.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c21.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c21.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c21.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c22
c22 = graph_label1.network_elements.create(:identifier => "c22", :alias => "alias1-c22", :ne_type => "/node/host/generic")
c22.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c22.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c22.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c22.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c23
c23 = graph_label1.network_elements.create(:identifier => "c23", :alias => "alias1-c23", :ne_type => "/node/host/generic")
c23.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c23.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c23.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c23.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c24
c24 = graph_label1.network_elements.create(:identifier => "c24", :alias => "alias1-c24", :ne_type => "/node/host/generic")
c24.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c24.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c24.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c24.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c25
c25 = graph_label1.network_elements.create(:identifier => "c25", :alias => "alias1-c25", :ne_type => "/node/host/generic")
c25.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c25.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c25.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c25.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c26
c26 = graph_label1.network_elements.create(:identifier => "c26", :alias => "alias1-c26", :ne_type => "/node/host/generic")
c26.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c26.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c26.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c26.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c27
c27 = graph_label1.network_elements.create(:identifier => "c27", :alias => "alias1-c27", :ne_type => "/node/host/generic")
c27.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c27.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c27.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c27.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c28
c28 = graph_label1.network_elements.create(:identifier => "c28", :alias => "alias1-c28", :ne_type => "/node/host/generic")
c28.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c28.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c28.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c28.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c29
c29 = graph_label1.network_elements.create(:identifier => "c29", :alias => "alias1-c29", :ne_type => "/node/host/generic")
c29.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c29.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c29.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c29.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c30
c30 = graph_label1.network_elements.create(:identifier => "c30", :alias => "alias1-c30", :ne_type => "/node/host/generic")
c30.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c30.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c30.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c30.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c31
c31 = graph_label1.network_elements.create(:identifier => "c31", :alias => "alias1-c31", :ne_type => "/node/host/generic")
c31.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c31.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c31.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c31.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c32
c32 = graph_label1.network_elements.create(:identifier => "c32", :alias => "alias1-c32", :ne_type => "/node/host/generic")
c32.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c32.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c32.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c32.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c33
c33 = graph_label1.network_elements.create(:identifier => "c33", :alias => "alias1-c33", :ne_type => "/node/host/generic")
c33.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c33.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c33.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c33.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c34
c34 = graph_label1.network_elements.create(:identifier => "c34", :alias => "alias1-c34", :ne_type => "/node/host/generic")
c34.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c34.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c34.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c34.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c35
c35 = graph_label1.network_elements.create(:identifier => "c35", :alias => "alias1-c35", :ne_type => "/node/host/generic")
c35.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c35.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c35.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c35.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c36
c36 = graph_label1.network_elements.create(:identifier => "c36", :alias => "alias1-c36", :ne_type => "/node/host/generic")
c36.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c36.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c36.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c36.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c37
c37 = graph_label1.network_elements.create(:identifier => "c37", :alias => "alias1-c37", :ne_type => "/node/host/generic")
c37.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c37.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c37.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c37.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c38
c38 = graph_label1.network_elements.create(:identifier => "c38", :alias => "alias1-c38", :ne_type => "/node/host/generic")
c38.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c38.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c38.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c38.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c39
c39 = graph_label1.network_elements.create(:identifier => "c39", :alias => "alias1-c39", :ne_type => "/node/host/generic")
c39.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c39.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c39.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c39.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c40
c40 = graph_label1.network_elements.create(:identifier => "c40", :alias => "alias1-c40", :ne_type => "/node/host/generic")
c40.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c40.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c40.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c40.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c41
c41 = graph_label1.network_elements.create(:identifier => "c41", :alias => "alias1-c41", :ne_type => "/node/host/generic")
c41.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c41.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c41.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c41.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c42
c42 = graph_label1.network_elements.create(:identifier => "c42", :alias => "alias1-c42", :ne_type => "/node/host/generic")
c42.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c42.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c42.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c42.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c43
c43 = graph_label1.network_elements.create(:identifier => "c43", :alias => "alias1-c43", :ne_type => "/node/host/generic")
c43.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c43.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c43.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c43.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c44
c44 = graph_label1.network_elements.create(:identifier => "c44", :alias => "alias1-c44", :ne_type => "/node/host/generic")
c44.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c44.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c44.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c44.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c45
c45 = graph_label1.network_elements.create(:identifier => "c45", :alias => "alias1-c45", :ne_type => "/node/host/generic")
c45.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c45.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c45.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c45.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c46
c46 = graph_label1.network_elements.create(:identifier => "c46", :alias => "alias1-c46", :ne_type => "/node/host/generic")
c46.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c46.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c46.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c46.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c47
c47 = graph_label1.network_elements.create(:identifier => "c47", :alias => "alias1-c47", :ne_type => "/node/host/generic")
c47.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c47.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c47.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c47.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c48
c48 = graph_label1.network_elements.create(:identifier => "c48", :alias => "alias1-c48", :ne_type => "/node/host/generic")
c48.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c48.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c48.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c48.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
#-----------------------------------------------------------

#===c49
c49 = graph_label1.network_elements.create(:identifier => "c49", :alias => "alias1-c49", :ne_type => "/node/host/generic")
c49.features.create(:avp_attribute => "/node/host/generic/Virtualization/mechanism", :value => "xen-3.4", :priority => 1, :is_request => 1)
c49.features.create(:avp_attribute => "/node/host/generic/Console/type", :value => "text", :priority => 1, :is_request => 1)
tmpres = c49.resources.create(:avp_attribute => "/node/host/generic/RAM/real/amount", :value => 768, :value_type => "constant", :is_request => 1)
tmpres = c49.resources.create(:avp_attribute => "/node/host/generic/HDD/hd_0/space", :value => "512", :value_type => "constant", :is_request => 1)
