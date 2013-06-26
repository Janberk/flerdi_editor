require "rubygems"
require "sinatra"
require "cloudnets"
require "sinatra/cross_origin"

set :bind, '0.0.0.0'
disable :protection

configure do
  enable :cross_origin
end

############################
# synchronize: graph_label #
############################

# create new graph_label
post '/graph_label/new' do
  GraphLabel.create(
    :role_identifier => params[:role_identifier],
    :graph_type => params[:graph_type],
    :graph_nr => params[:graph_nr],
    :graph_tag => params[:graph_tag],
    :v_net_identifier => params[:v_net_identifier]
  ).to_json
end

# modify graph_label
put '/graph_label/:id' do
  GraphLabel.update(
    params[:id].to_i,
    :role_identifier => params[:role_identifier],
    :graph_type => params[:graph_type],
    :graph_nr => params[:graph_nr],
    :graph_tag => params[:graph_tag],
    :v_net_identifier => params[:v_net_identifier]
  )
end

# delete graph_label
delete '/graph_label/:id' do
  GraphLabel.destroy(params[:id].to_i)
end

# load graph_label
get '/graph_label/:id' do
  GraphLabel.find(params[:id].to_i).to_json
end

################################
# synchronize: network_element #
################################

post '/network_element/new' do
  ne = GraphLabel.find(params[:graph_label].to_i).network_elements.create(
    :identifier => params[:identifier],
    :ne_type => params[:ne_type],
    :v_net_identifier => params[:v_net_identifier],
    :alias => params[:alias]
  )
  ne.features.create(
    :avp_attribute => "position_x",
    :value => params[:position_x],
    :priority => 1,
    :is_request => 0
  )
  ne.features.create(
    :avp_attribute => "position_y",
    :value => params[:position_y],
    :priority => 1,
    :is_request => 0
  )
  ne.to_json
end

put '/network_element/:id' do
  ne = NetworkElement.find(params[:id].to_i)
  if params[:todo] == 'move'
    ne.features.where(:avp_attribute => 'position_x').update(:value => params[:position_x])
    ne.features.where(:avp_attribute => 'position_y').update(:value => params[:position_y])
  else
    ne.update(
      :identifier => params[:identifier],
      :ne_type => params[:ne_type],
      :v_net_identifier => params[:v_net_identifier],
      :alias => params[:alias]
    )
  end
end

delete '/network_element/:id' do
  NetworkElement.find(params[:id].to_i).delete_network_element
end

##################################
# synchronize: network_interface #
##################################

post '/network_interface/new' do
  ne = NetworkElement.find(params[:network_element].to_i)
  ne.network_interfaces.create(
    :identifier => params[:identifier],
    :alias => params[:alias],
    :ni_type => params[:ni_type]
  ).to_json
end

put '/network_interface/:id' do
  NetworkInterface.update(
    params[:id].to_i,
    :identifier => params[:identifier],
    :alias => params[:alias],
    :ni_type => params[:ni_type]
  )
end

delete '/network_interface/:id' do
  NetworkInterface.find(params[:id].to_i).delete_network_interface
end

#########################
# synchronize: resource #
#########################

post '/resource/new' do
  el = ""
  if params[:target] == 'ni'
    el = NetworkInterface.find(params[:id].to_i)
  else
    el = NetworkElement.find(params[:id].to_i)
  end
  el.resources.create(
    :avp_attribute => params[:avp_attribute],
    :value => params[:value].to_i,
    :value_type => params[:value_type],
    :is_request => params[:is_request].to_i
  ).to_json
end

put '/resource/:id' do
  Resource.update(
    params[:id].to_i,
    :avp_attribute => params[:avp_attribute],
    :value => params[:value].to_i,
    :value_type => params[:value_type],
    :is_request => params[:is_request].to_i
  )
end

delete '/resource/:id' do
  Resource.find(params[:id].to_i).delete
end

########################
# synchronize: feature #
########################

post '/feature/new' do
  el = ""
  if params[:target] == 'ni'
    el = NetworkInterface.find(params[:id].to_i)
  else
    el = NetworkElement.find(params[:id].to_i)
  end
  el.features.create(
    :avp_attribute => params[:avp_attribute],
    :value => params[:value],
    :priority => params[:priority].to_i,
    :is_request => params[:is_request].to_i
  ).to_json
end

put '/feature/:id' do
  Feature.update(
    params[:id].to_i,
    :avp_attribute => params[:avp_attribute],
    :value => params[:value],
    :priority => params[:priority].to_i,
    :is_request => params[:is_request].to_i
  )
end

delete '/feature/:id' do
  Feature.find(params[:id].to_i).delete
end


#######################################
# synchronize: provisioning_interface #
#######################################

post '/provisioning_interface/new' do
  ne = NetworkElement.find(params[:network_element].to_i)
  ne.provisioning_interface.create(
    :adress => params[:adress],
    :port => params[:port],
    :username => params[:username],
    :password => params[:password],
    :protocol => params[:protocol]
  ).to_json
end

put '/provisioning_interface/:id' do
  ProvisioningInterface.update(
    params[:id].to_i,
    :adress => params[:adress],
    :port => params[:port],
    :username => params[:username],
    :password => params[:password],
    :protocol => params[:protocol]
  )
end

delete '/provisioning_interface/:id' do
  ProvisioningInterface.find(params[:id].to_i).delete_network_interface
end