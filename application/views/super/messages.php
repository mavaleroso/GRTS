<div class="container">
	<div class="row">
		<div class="col-lg-4">
			<div class="message-users card shadow mt-3">
				<div class="card-header d-flex">
					<h6 class="m-0"><i class="fas fa-users mr-2"></i>Message Users</h6>	
					<h6 id="btn-send-all" class="btn-send-all"><i class="fas fa-paper-plane"></i></h6>
				</div>
				<div class="card-body p-2">
					<div class="message-btn d-flex m-2">
						<button id="btn-recent" class="btn btn-sm btn-primary msg-btn"><i class="fas fa-envelope-open mr-2"></i>Recent</button>
						<button id="btn-new" class="btn btn-sm btn-primary msg-btn"><i class="fas fa-envelope mr-2"></i>New</button>
					</div>
					<div class="msg-user-search d-flex mt-3">
						<input id="search-user" class="recent-msg" type="text" placeholder="Search..." name="">
						<p>
							<i class="fas"></i>
						</p>
					</div>
					<section id="recent-messages" class="mt-2">
					</section>
					<section id="new-messages" class="hidden mt-2">
					</section>
				</div>
			</div>
		</div>
		<div class="col-lg-8">
			<div class="message-conversation card shadow mt-3">
				<div class="card-header d-flex">
					<h6 class="m-0 mr-auto"><i class="fas fa-comment-dots mr-2"></i>Conversation</h6>	
					<div class="user-convo-header ml-auto d-flex">
					</div>
				</div>
				<div class="card-body p-0">
					<div class="convo-area p-4">
						<div class="main-convo">
							<i class="far fa-comments"></i>
							<p>Connect with other users.</p>
						</div>
					</div>
					<div class="input-area d-flex">
						<div class="msg-field">
							<textarea id="msg-content"></textarea>
						</div>
						<button id="btn-send-msg" class="btn-msg-send"><i class="far fa-paper-plane"></i></button>						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="<?= base_url() ?>assets/js/super-messages.js"></script>