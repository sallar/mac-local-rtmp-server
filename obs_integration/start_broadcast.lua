obs           = obslua

localSettings = settings
----------------------------------------------------------

-- A function named script_description returns the description shown to
-- the user
function script_description()
	return "Starts streaming with RTMP when OBS is started."
end

-- a function named script_load will be called on startup
function script_load(settings)
	localSettings = settings
	set_custom_stream_service()
	start_streaming()
end

function set_custom_stream_service()
	local settings = obs.obs_data_create()

    	-- Set the stream service type to "Custom"
    	obs.obs_data_set_string(settings, "service", "rtmp_custom")

    	-- Set the server and stream key
    	obs.obs_data_set_string(settings, "server", "rtmp://127.0.0.1/live/")
    	obs.obs_data_set_string(settings, "key", "HelloWorld!")

    	-- Apply the settings
    	local service = obs.obs_service_create("rtmp_custom", "Custom", settings, nil)
    	obs.obs_frontend_set_streaming_service(service)

    	-- Release the settings object
    	obs.obs_data_release(settings)
    	obs.obs_service_release(service)
end

function start_streaming()
    -- Check if streaming is not already active
    if not obs.obs_frontend_streaming_active() then
        obs.obs_frontend_streaming_start()
    end
end